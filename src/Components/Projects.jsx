import { Link } from "react-router-dom";

import { projects } from "../data/projects";

const Projects = ({ textEnter, textLeave }) => {
  return (
    <div className="Projects">
      <div className="projects-container">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <img loading="lazy" src={project.coverImage} alt={project.title} />
            <Link
              to={`/projects/${project.id}`}
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              <div className="project-info">
                <h2>{project.title}</h2>
                <h4>{project.category}</h4>
                {project.result && <p>{project.result}</p>}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Projects;
