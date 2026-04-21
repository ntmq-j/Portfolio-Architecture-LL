const coverModules = import.meta.glob("../projects/*.jpg", {
  eager: true,
  import: "default",
});

const galleryModules = import.meta.glob("../projects/*/*.jpg", {
  eager: true,
  import: "default",
});

const sortByFileNumber = ([pathA], [pathB]) => {
  const numberA = Number(pathA.match(/\/(\d+)\.jpg$/)?.[1] ?? 0);
  const numberB = Number(pathB.match(/\/(\d+)\.jpg$/)?.[1] ?? 0);

  return numberA - numberB;
};

const getCoverImage = (id) => coverModules[`../projects/${id}.jpg`];

const getGalleryImages = (id) =>
  Object.entries(galleryModules)
    .filter(([path]) => path.startsWith(`../projects/${id}/`))
    .sort(sortByFileNumber)
    .map(([, image]) => image);

const projectMeta = [
  {
    id: "p1",
    title: "Gepflegtes Stadtwohnen in Magdeburg",
    category: "Wettbewerb",
    result: "1. Preis",
  },
  {
    id: "p2",
    title: "Erweiterung Berufsschule Eichstätt",
    category: "Wettbewerb",
    result: "2. Preis",
  },
  {
    id: "p3",
    title: "Privates Wohnhaus in Mallorca",
    category: "Wettbewerb",
  },
  {
    id: "p4",
    title: "Kleisthof Wohnkomplex mit Tiefgarage",
    category: "LP 1-4",
  },
  {
    id: "p5",
    title: "4 Wohngebäude am Rosental",
    category: "LP 1-4",
  },
  {
    id: "p6",
    title: "Konsumgenossenschaft Leipzig",
    category: "LP 1-4",
  },
  {
    id: "p7",
    title: "Büro- und Laborgebäude BioCampus",
    category: "LP 3-5",
  },
  {
    id: "p8",
    title: "Bürogebäude Berliner Straße",
    category: "LP 3-4",
  },
  {
    id: "p9",
    title: "Mehrfamilienhäuser Glücksburg",
    category: "LP 5",
  },
];

export const projects = projectMeta.map((project) => ({
  ...project,
  coverImage: getCoverImage(project.id),
  images: getGalleryImages(project.id),
}));

export const getProjectById = (id) =>
  projects.find((project) => project.id === id);
