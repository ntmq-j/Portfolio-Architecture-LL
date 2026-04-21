const photoModules = import.meta.glob("../fotography/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const photos = Object.entries(photoModules)
  .sort(([pathA], [pathB]) =>
    pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: "base" }),
  )
  .map(([, photo]) => photo);

const Fotography = () => {
  return (
    <div className="Fotography">
      <div className="fotos-container">
        <ul className="gallery">
          {photos.map((photo, index) => (
            <li key={photo}>
              <img
                loading="lazy"
                decoding="async"
                src={photo}
                alt={`Photography ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Fotography;
