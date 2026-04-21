import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { getProjectById } from "../data/projects";

const ProjectDetail = ({ textEnter, textLeave }) => {
  const { projectId } = useParams();
  const project = getProjectById(projectId);
  const imageCount = project?.images.length ?? 0;

  useEffect(() => {
    textLeave();
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

  return (
    <div className="singleProject">
      <article className="project-detail project-detail-split">
        <aside className="project-meta-panel">
          <div className="project-meta-top">
            <Link
              className="project-back-link"
              to="/projects"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              Projects
            </Link>

            <header className="project-heading">
              <h1>{project.title}</h1>
              <p>
                {project.category}
                {project.result && ` · ${project.result}`}
              </p>
            </header>
          </div>

          <div className="project-meta-middle">
            {project.description && (
              <section className="project-about">
                <h2>About</h2>
                <p>{project.description}</p>
              </section>
            )}
          </div>

          <dl className="project-facts">
            <div>
              <dt>Pages</dt>
              <dd>{imageCount}</dd>
            </div>
            {project.year && (
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
            )}
            {project.location && (
              <div>
                <dt>Location</dt>
                <dd>{project.location}</dd>
              </div>
            )}
          </dl>
        </aside>

        <section className="project-scroll-viewer">
          {imageCount === 0 ? (
            <p className="project-empty-state">No project images found.</p>
          ) : (
            project.images.map((image, index) => (
              <figure className="project-page" key={image}>
                <img
                  loading="lazy"
                  src={image}
                  alt={`${project.title} page ${index + 1}`}
                />
                <figcaption>
                  {index + 1} / {imageCount}
                </figcaption>
              </figure>
            ))
          )}
        </section>
      </article>
    </div>
  );
};

export default ProjectDetail;
