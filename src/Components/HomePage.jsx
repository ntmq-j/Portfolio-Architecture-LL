import { useEffect, useMemo, useState } from "react";

const galleryModules = import.meta.glob("../gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const shuffleImages = (images) => {
  const shuffled = [...images];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

const HomePage = () => {
  const images = useMemo(
    () =>
      shuffleImages(
        Object.entries(galleryModules)
          .sort(([pathA], [pathB]) =>
            pathA.localeCompare(pathB, undefined, {
              numeric: true,
              sensitivity: "base",
            }),
          )
          .map(([, image]) => image),
      ),
    [],
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="img-container">
      <div className="carousel-container">
        {images.map((image, index) => (
          <img
            key={image}
            className={index === currentSlide ? "active" : "image"}
            src={image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
