import React from 'react';
import '../styles/Projects.css';

const ProjectCard = ({ project }) => {
  const {
    title,
    name,
    description,
    techStack,
    language,
    githubUrl,
    html_url,
    liveUrl,
    homepage,
    stargazers_count,
    status,
  } = project;

  const displayTitle = title || name;
  const displayDescription = description || 'No description available';
  const displayTechStack = techStack || (language ? [language] : []);
  const repoUrl = githubUrl || html_url;
  const demoUrl = liveUrl || homepage;

  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3 className="project-title">{displayTitle}</h3>
        <div className="project-header-badges">
          {status && (
            <span className="project-status">{status}</span>
          )}
          {stargazers_count !== undefined && (
            <span className="project-stars">
              <span className="star-icon">★</span> {stargazers_count}
            </span>
          )}
        </div>
      </div>

      <p className="project-description">{displayDescription}</p>

      {displayTechStack.length > 0 && (
        <div className="project-tech-stack">
          {displayTechStack.map((tech, index) => (
            <span key={index} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="project-links">
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <span className="link-icon">{'<>'}</span> View Code
          </a>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link project-link-demo"
          >
            <span className="link-icon">↗</span> Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
