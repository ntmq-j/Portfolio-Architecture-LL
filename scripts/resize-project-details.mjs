import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

const DEFAULTS = {
  width: 1667,
  height: 2358,
  fit: "contain",
  quality: 90,
  background: "#ffffff",
};

const usage = `
Usage:
  npm run resize:project -- <input-folder> <output-folder> [options]

Examples:
  npm run resize:project -- raw/undone-house src/projects/undone-house
  npm run resize:project -- raw/my-project src/projects/my-project --quality=92
  npm run resize:project -- raw/my-project src/projects/my-project --fit=cover

Options:
  --width=1667          Output width in pixels
  --height=2358         Output height in pixels
  --fit=contain         contain keeps all content; cover crops to fill
  --quality=90          JPG quality, 1-100
  --background=#ffffff  Background used with contain
  --keep-names          Keep original filenames instead of 1.jpg, 2.jpg
  --include-cover       Also process files named cover.*
`;

const parseArgs = (argv) => {
  const positionals = [];
  const options = {
    ...DEFAULTS,
    keepNames: false,
    includeCover: false,
  };

  for (const arg of argv) {
    if (!arg.startsWith("--")) {
      positionals.push(arg);
      continue;
    }

    const [name, value] = arg.slice(2).split("=");

    if (name === "keep-names") {
      options.keepNames = true;
    } else if (name === "include-cover") {
      options.includeCover = true;
    } else if (name === "width" || name === "height" || name === "quality") {
      options[name] = Number(value);
    } else if (name === "fit" || name === "background") {
      options[name] = value;
    } else {
      throw new Error(`Unknown option: --${name}`);
    }
  }

  if (positionals.length < 2) {
    throw new Error("Missing input or output folder.");
  }

  if (!Number.isInteger(options.width) || options.width <= 0) {
    throw new Error("--width must be a positive integer.");
  }

  if (!Number.isInteger(options.height) || options.height <= 0) {
    throw new Error("--height must be a positive integer.");
  }

  if (!Number.isInteger(options.quality) || options.quality < 1 || options.quality > 100) {
    throw new Error("--quality must be an integer from 1 to 100.");
  }

  if (!["contain", "cover"].includes(options.fit)) {
    throw new Error("--fit must be either contain or cover.");
  }

  return {
    inputDir: path.resolve(positionals[0]),
    outputDir: path.resolve(positionals[1]),
    options,
  };
};

const naturalCompare = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const isDetailImage = (fileName, includeCover) => {
  const extension = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName, extension).toLowerCase();

  if (!IMAGE_EXTENSIONS.has(extension)) {
    return false;
  }

  return includeCover || baseName !== "cover";
};

const ensureDifferentFolders = (inputDir, outputDir) => {
  if (inputDir === outputDir) {
    throw new Error(
      "Input and output folders must be different. Use a temporary output folder, then review before replacing files.",
    );
  }
};

const resizeImage = async ({ inputPath, outputPath, options }) => {
  await sharp(inputPath)
    .rotate()
    .resize({
      width: options.width,
      height: options.height,
      fit: options.fit,
      position: "center",
      background: options.background,
      withoutEnlargement: false,
    })
    .flatten({ background: options.background })
    .jpeg({
      quality: options.quality,
      mozjpeg: true,
    })
    .toFile(outputPath);
};

const main = async () => {
  const { inputDir, outputDir, options } = parseArgs(process.argv.slice(2));
  ensureDifferentFolders(inputDir, outputDir);

  const files = (await fs.readdir(inputDir))
    .filter((fileName) => isDetailImage(fileName, options.includeCover))
    .sort(naturalCompare);

  if (files.length === 0) {
    throw new Error(`No supported images found in ${inputDir}`);
  }

  await fs.mkdir(outputDir, { recursive: true });

  for (const [index, fileName] of files.entries()) {
    const inputPath = path.join(inputDir, fileName);
    const outputName = options.keepNames
      ? `${path.basename(fileName, path.extname(fileName))}.jpg`
      : `${index + 1}.jpg`;
    const outputPath = path.join(outputDir, outputName);

    await resizeImage({ inputPath, outputPath, options });
    console.log(`${fileName} -> ${path.relative(process.cwd(), outputPath)}`);
  }

  console.log(
    `Done. ${files.length} image(s) resized to ${options.width}x${options.height} using fit=${options.fit}.`,
  );
};

main().catch((error) => {
  console.error(error.message);
  console.error(usage);
  process.exit(1);
});
