import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { getProjectById } from "../data/projects";

const ProjectDetail = ({ textEnter, textLeave }) => {
  const { projectId } = useParams();
  const project = getProjectById(projectId);
  const [currentImage, setCurrentImage] = useState(0);
  const imageCount = project?.images.length ?? 0;

  useEffect(() => {
    textLeave();
    setCurrentImage(0);
  }, [projectId, textLeave]);

  const nextImage = useCallback(() => {
    if (imageCount < 2) return;

    setCurrentImage((prev) => (prev + 1) % imageCount);
  }, [imageCount]);

  const prevImage = useCallback(() => {
    if (imageCount < 2) return;

    setCurrentImage(
      (prev) => (prev - 1 + imageCount) % imageCount,
    );
  }, [imageCount]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        prevImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextImage, prevImage]);

  if (!project) {
    return (
      <div className="singleProject">
        <div className="project-heading">
          <h1>Project not found</h1>
          <Link
            to="/projects"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  if (imageCount === 0) {
    return (
      <div className="singleProject">
        <div className="project-heading">
          <Link
            to="/projects"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            Projects
          </Link>
          <h1>{project.title}</h1>
          <p>No project images found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="singleProject">
      <div className="project-detail">
        <header className="project-heading">
          <Link
            to="/projects"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            Projects
          </Link>
          <h1>{project.title}</h1>
          <p>
            {project.category}
            {project.result && ` · ${project.result}`}
          </p>
        </header>

        <div className="wrapper project-viewer">
          <button
            className="project-nav-button"
            type="button"
            onClick={prevImage}
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
            aria-label="Previous image"
            disabled={imageCount < 2}
          >
            <IoIosArrowBack />
          </button>
          <figure className="project-image-frame">
            <img
              loading="lazy"
              src={project.images[currentImage]}
              alt={`${project.title} ${currentImage + 1}`}
            />
            <figcaption>
              {currentImage + 1} / {imageCount}
            </figcaption>
          </figure>
          <button
            className="project-nav-button"
            type="button"
            onClick={nextImage}
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
            aria-label="Next image"
            disabled={imageCount < 2}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
