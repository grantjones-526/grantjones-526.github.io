import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeInteractive.css';

const HomeInteractive = () => {
  const navigate = useNavigate();
  const [hoveredZone, setHoveredZone] = useState(null);

  const hotspots = [
    {
      id: 'projects',
      label: 'Projects Terminal',
      description: 'View my portfolio projects',
      path: '/projects',
      style: { top: '30%', left: '15%', width: '25%', height: '30%' }
    },
    {
      id: 'about',
      label: 'About Monitor',
      description: 'Learn more about me',
      path: '/about',
      style: { top: '25%', left: '45%', width: '35%', height: '40%' }
    },
    {
      id: 'contact',
      label: 'Contact Panel',
      description: 'Get in touch',
      path: '/contact',
      style: { top: '65%', left: '65%', width: '20%', height: '20%' }
    },
    {
      id: 'github',
      label: 'GitHub',
      description: 'View my repositories',
      path: 'https://github.com/gdjones-526',
      external: true,
      style: { top: '70%', left: '10%', width: '15%', height: '15%' }
    }
  ];

  const handleHotspotClick = (hotspot) => {
    if (hotspot.external) {
      window.open(hotspot.path, '_blank');
    } else {
      navigate(hotspot.path);
    }
  };

  return (
    <div className="home-interactive">
      {/* Rain effect */}
      <div className="rain-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 1}s`
            }}
          />
        ))}
      </div>

      {/* Scanlines effect */}
      <div className="scanlines"></div>

      {/* Main scene container */}
      <div className="scene-container">

        {/* Animated terminal in top left */}
        <div className="terminal-widget terminal-left">
          <div className="terminal-header">
            <span className="terminal-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
            <span className="terminal-title">system.log</span>
          </div>
          <div className="terminal-content">
            <p className="terminal-line typing-animation-1">$ Grant Jones Portfolio v2.0</p>
            <p className="terminal-line typing-animation-2">$ Loading modules...</p>
            <p className="terminal-line typing-animation-3">$ [OK] Projects initialized</p>
            <p className="terminal-line typing-animation-4">$ [OK] Skills loaded</p>
            <p className="terminal-line typing-animation-5">$ System ready <span className="cursor-blink">_</span></p>
          </div>
        </div>

        {/* Central display with name */}
        <div className="central-display">
          <h1 className="glitch-text" data-text="GRANT JONES">GRANT JONES</h1>
          <div className="subtitle-display">
            <span className="role-label">ROLE:</span>
            <span className="role-value">AI/ML Developer & Graduate Student</span>
          </div>
          <div className="status-bar">
            <span className="status-indicator"></span>
            <span className="status-text">SYSTEM ONLINE</span>
          </div>
        </div>

        {/* Animated graph widget */}
        <div className="graph-widget">
          <div className="graph-header">SKILL METRICS</div>
          <div className="graph-bars">
            <div className="graph-bar" style={{ '--bar-height': '85%', '--delay': '0s' }}>
              <span className="bar-label">Python</span>
            </div>
            <div className="graph-bar" style={{ '--bar-height': '75%', '--delay': '0.2s' }}>
              <span className="bar-label">Java</span>
            </div>
            <div className="graph-bar" style={{ '--bar-height': '80%', '--delay': '0.4s' }}>
              <span className="bar-label">ML</span>
            </div>
            <div className="graph-bar" style={{ '--bar-height': '70%', '--delay': '0.6s' }}>
              <span className="bar-label">React</span>
            </div>
          </div>
        </div>

        {/* Stats panel */}
        <div className="stats-panel">
          <div className="stat-item">
            <span className="stat-value count-animation">4</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-value count-animation">8+</span>
            <span className="stat-label">Languages</span>
          </div>
        </div>

        {/* Interactive hotspots */}
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className={`hotspot ${hoveredZone === hotspot.id ? 'active' : ''}`}
            style={hotspot.style}
            onMouseEnter={() => setHoveredZone(hotspot.id)}
            onMouseLeave={() => setHoveredZone(null)}
            onClick={() => handleHotspotClick(hotspot)}
          >
            <div className="hotspot-overlay">
              <div className="hotspot-content">
                <div className="hotspot-icon">→</div>
                <div className="hotspot-label">{hotspot.label}</div>
                <div className="hotspot-description">{hotspot.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom instruction bar */}
      <div className="instruction-bar">
        <span className="instruction-text">
          <span className="instruction-icon">▶</span> Hover over the scene to explore interactive areas
        </span>
      </div>
    </div>
  );
};

export default HomeInteractive;
