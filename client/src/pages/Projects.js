import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProjects, getGitHubRepos } from '../services/api';
import '../styles/Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [githubRepos, setGithubRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsData, reposData] = await Promise.all([
          getProjects(),
          getGitHubRepos(),
        ]);
        setProjects(projectsData);
        setGithubRepos(reposData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allProjects = [...projects, ...githubRepos];

  const displayProjects = () => {
    switch (activeTab) {
      case 'featured':
        return projects;
      case 'github':
        return githubRepos;
      default:
        return allProjects;
    }
  };

  if (loading) {
    return (
      <div className="projects-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">
            <span className="terminal-prompt">$</span> Loading projects...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-container">
        <div className="error-container">
          <span className="error-icon">✗</span>
          <p className="error-text">Error: {error}</p>
          <button
            className="error-retry"
            onClick={() => window.location.reload()}
          >
            <span className="button-icon">↻</span> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <div className="projects-header">
        <div className="terminal-line">
          <span className="terminal-prompt">user@portfolio:~$</span>
          <span className="terminal-command">ls projects/</span>
        </div>
        <h1 className="projects-title">My Projects</h1>
        <p className="projects-subtitle">
          A collection of my work showcasing various technologies and solutions
        </p>
      </div>

      <div className="projects-tabs">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <span className="tab-icon">*</span> All Projects ({allProjects.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'featured' ? 'active' : ''}`}
          onClick={() => setActiveTab('featured')}
        >
          <span className="tab-icon">★</span> Featured ({projects.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'github' ? 'active' : ''}`}
          onClick={() => setActiveTab('github')}
        >
          <span className="tab-icon">{'<>'}</span> GitHub ({githubRepos.length})
        </button>
      </div>

      <div className="projects-grid">
        {displayProjects().length > 0 ? (
          displayProjects().map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="no-projects">
            <p>No projects found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
