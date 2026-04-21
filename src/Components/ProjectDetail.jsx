import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { getProjectById } from "../data/projects";

const ProjectDetail = ({ textEnter, textLeave }) => {
  const { projectId } = useParams();
  const project = getProjectById(projectId);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    textLeave();
    setCurrentImage(0);
  }, [projectId, textLeave]);

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

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + project.images.length) % project.images.length,
    );
  };

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

        <div className="wrapper">
          <button onClick={prevImage} aria-label="Previous image">
            <IoIosArrowBack
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            />
          </button>
          <figure className="project-image-frame">
            <img
              loading="lazy"
              src={project.images[currentImage]}
              alt={`${project.title} ${currentImage + 1}`}
            />
            <figcaption>
              {currentImage + 1} / {project.images.length}
            </figcaption>
          </figure>
          <button onClick={nextImage} aria-label="Next image">
            <IoIosArrowForward
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
