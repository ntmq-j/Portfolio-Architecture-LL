const coverModules = import.meta.glob("../projects/*/cover.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const galleryModules = import.meta.glob("../projects/*/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const projectModules = import.meta.glob("../projects/*/project.js", {
  eager: true,
  import: "default",
});

const sortByFileNumber = ([pathA], [pathB]) => {
  const numberA = Number(pathA.match(/\/(\d+)\.(jpg|jpeg|png|webp)$/)?.[1] ?? 0);
  const numberB = Number(pathB.match(/\/(\d+)\.(jpg|jpeg|png|webp)$/)?.[1] ?? 0);

  return numberA - numberB;
};

const getProjectId = (path) => path.match(/\/projects\/([^/]+)\/project\.js$/)?.[1];

const getCoverImage = (id) =>
  Object.entries(coverModules).find(([path]) =>
    path.startsWith(`../projects/${id}/cover.`),
  )?.[1];

const getGalleryImages = (id) =>
  Object.entries(galleryModules)
    .filter(
      ([path]) =>
        path.startsWith(`../projects/${id}/`) &&
        /\/\d+\.(jpg|jpeg|png|webp)$/.test(path),
    )
    .sort(sortByFileNumber)
    .map(([, image]) => image);

export const projects = Object.entries(projectModules)
  .map(([path, meta]) => {
    const id = getProjectId(path);

    return {
      id,
      ...meta,
      coverImage: getCoverImage(id),
      images: getGalleryImages(id),
    };
  })
  .sort((projectA, projectB) => projectA.order - projectB.order);

export const getProjectById = (id) =>
  projects.find((project) => project.id === id);
