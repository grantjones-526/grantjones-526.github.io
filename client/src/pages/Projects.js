import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TerminalPage from '../components/TerminalPage';
import ProjectCard from '../components/ProjectCard';
import { getProjects, getGitHubRepos } from '../services/api';
import '../styles/Projects.css';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [githubRepos, setGithubRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [backButtonSelected, setBackButtonSelected] = useState(true);
  const tabs = ['all', 'featured', 'github'];
  const cardRefs = useRef([]);
  const tabRefs = useRef([]);

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

  const displayProjects = useCallback(() => {
    switch (activeTab) {
      case 'featured':
        return projects;
      case 'github':
        return githubRepos;
      default:
        return allProjects;
    }
  }, [activeTab, projects, githubRepos, allProjects]);

  // Reset card selection when tab changes
  useEffect(() => {
    setSelectedCardIndex(-1);
  }, [activeTab]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    // Don't handle if typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    const currentProjects = displayProjects();
    const projectCount = currentProjects.length;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (!backButtonSelected && selectedCardIndex === -1) {
          // Navigate tabs
          const newTabIndex = selectedTabIndex > 0 ? selectedTabIndex - 1 : tabs.length - 1;
          setSelectedTabIndex(newTabIndex);
          setActiveTab(tabs[newTabIndex]);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (!backButtonSelected && selectedCardIndex === -1) {
          // Navigate tabs
          const newTabIndex = selectedTabIndex < tabs.length - 1 ? selectedTabIndex + 1 : 0;
          setSelectedTabIndex(newTabIndex);
          setActiveTab(tabs[newTabIndex]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (backButtonSelected) {
          // Move from back button to tabs
          setBackButtonSelected(false);
        } else if (selectedCardIndex === -1 && projectCount > 0) {
          // Move from tabs to first card
          setSelectedCardIndex(0);
        } else if (selectedCardIndex < projectCount - 1) {
          setSelectedCardIndex(prev => prev + 1);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (selectedCardIndex > 0) {
          setSelectedCardIndex(prev => prev - 1);
        } else if (selectedCardIndex === 0) {
          // Move back to tabs
          setSelectedCardIndex(-1);
        } else if (selectedCardIndex === -1 && !backButtonSelected) {
          // Move to back button
          setBackButtonSelected(true);
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (backButtonSelected) {
          navigate('/');
        } else if (selectedCardIndex >= 0 && selectedCardIndex < projectCount) {
          const project = currentProjects[selectedCardIndex];
          const url = project.githubUrl || project.html_url;
          if (url) {
            window.open(url, '_blank');
          }
        }
        break;
      default:
        break;
    }
  }, [selectedTabIndex, selectedCardIndex, tabs, displayProjects, backButtonSelected, navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Scroll to selected item only if not visible
  useEffect(() => {
    if (backButtonSelected) {
      // Scroll to top when back button is selected
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    let el = null;
    if (selectedCardIndex >= 0 && cardRefs.current[selectedCardIndex]) {
      el = cardRefs.current[selectedCardIndex];
    } else if (selectedCardIndex === -1 && tabRefs.current[selectedTabIndex]) {
      el = tabRefs.current[selectedTabIndex];
    }

    if (el) {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (!isVisible) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [selectedCardIndex, selectedTabIndex, backButtonSelected]);

  if (loading) {
    return (
      <TerminalPage title="PROJECTS" backButtonSelected={backButtonSelected}>
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
      <TerminalPage title="PROJECTS" backButtonSelected={backButtonSelected}>
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
    <TerminalPage title="PROJECTS" backButtonSelected={backButtonSelected}>
      <p className="section-description">> A collection of my work and applications</p>

      <div className="projects-tabs">
        <button
          ref={el => tabRefs.current[0] = el}
          className={`tab-button ${activeTab === 'all' ? 'active' : ''} ${selectedTabIndex === 0 && selectedCardIndex === -1 && !backButtonSelected ? 'selected' : ''}`}
          onClick={() => { setActiveTab('all'); setSelectedTabIndex(0); }}
        >
          [ALL: {allProjects.length}]
        </button>
        <button
          ref={el => tabRefs.current[1] = el}
          className={`tab-button ${activeTab === 'featured' ? 'active' : ''} ${selectedTabIndex === 1 && selectedCardIndex === -1 && !backButtonSelected ? 'selected' : ''}`}
          onClick={() => { setActiveTab('featured'); setSelectedTabIndex(1); }}
        >
          [FEATURED: {projects.length}]
        </button>
        <button
          ref={el => tabRefs.current[2] = el}
          className={`tab-button ${activeTab === 'github' ? 'active' : ''} ${selectedTabIndex === 2 && selectedCardIndex === -1 && !backButtonSelected ? 'selected' : ''}`}
          onClick={() => { setActiveTab('github'); setSelectedTabIndex(2); }}
        >
          [GITHUB: {githubRepos.length}]
        </button>
      </div>

      <div className="projects-grid">
        {displayProjects().length > 0 ? (
          displayProjects().map((project, index) => (
            <ProjectCard
              key={project.id}
              ref={el => cardRefs.current[index] = el}
              project={project}
              selected={selectedCardIndex === index}
              onClick={() => setSelectedCardIndex(index)}
            />
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
