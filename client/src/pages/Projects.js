import React, { useState, useEffect } from 'react';
import TerminalPage from '../components/TerminalPage';
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
      <TerminalPage title="PROJECTS">
        <div className="loading-container">
          <p className="loading-text">> Loading projects...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </TerminalPage>
    );
  }

  if (error) {
    return (
      <TerminalPage title="PROJECTS">
        <div className="error-container">
          <p className="error-text">> ERROR: {error}</p>
          <button className="terminal-button" onClick={() => window.location.reload()}>
            [RETRY]
          </button>
        </div>
      </TerminalPage>
    );
  }

  return (
    <TerminalPage title="PROJECTS">
      <p className="section-description">> A collection of my work and applications</p>

      <div className="projects-tabs">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          [ALL: {allProjects.length}]
        </button>
        <button
          className={`tab-button ${activeTab === 'featured' ? 'active' : ''}`}
          onClick={() => setActiveTab('featured')}
        >
          [FEATURED: {projects.length}]
        </button>
        <button
          className={`tab-button ${activeTab === 'github' ? 'active' : ''}`}
          onClick={() => setActiveTab('github')}
        >
          [GITHUB: {githubRepos.length}]
        </button>
      </div>

      <div className="projects-grid">
        {displayProjects().length > 0 ? (
          displayProjects().map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="no-projects">
            <p>> No projects found in this category</p>
          </div>
        )}
      </div>
    </TerminalPage>
  );
};

export default Projects;
