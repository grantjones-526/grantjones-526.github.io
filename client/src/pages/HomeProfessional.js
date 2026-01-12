import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeProfessional.css';

const HomeProfessional = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [bootText, setBootText] = useState([]);

  const menuItems = [
    { label: 'PROJECTS', path: '/projects', description: 'View my work and applications' },
    { label: 'ABOUT', path: '/about', description: 'Education, experience, and skills' },
    { label: 'CONTACT', path: '/contact', description: 'Get in touch' },
  ];

  const bootSequence = [
    'ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL',
    'ENTER PASSWORD NOW',
    '',
    '> ************',
    '> PASSWORD ACCEPTED',
    '',
    'LOADING PORTFOLIO INTERFACE...',
    '',
  ];

  // Boot sequence animation
  useEffect(() => {
    let lineIndex = 0;
    const bootInterval = setInterval(() => {
      if (lineIndex < bootSequence.length) {
        setBootText(prev => [...prev, bootSequence[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => setBootComplete(true), 300);
      }
    }, 150);

    return () => clearInterval(bootInterval);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!bootComplete) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : menuItems.length - 1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        navigate(menuItems[selectedIndex].path);
        break;
      default:
        break;
    }
  }, [bootComplete, selectedIndex, navigate, menuItems]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="terminal-container">
      <div className="terminal-screen">
        {/* Boot sequence */}
        <div className="boot-sequence">
          {bootText.map((line, index) => (
            <div key={index} className="boot-line">{line}</div>
          ))}
        </div>

        {/* Main terminal content */}
        {bootComplete && (
          <div className="terminal-content fade-in">
            <div className="terminal-header">
              <div className="header-line">════════════════════════════════════════════════════════</div>
              <h1 className="terminal-title">GRANT JONES</h1>
              <p className="terminal-subtitle">FULL STACK DEVELOPER & GRADUATE STUDENT</p>
              <div className="header-line">════════════════════════════════════════════════════════</div>
            </div>

            <div className="terminal-bio">
              <p>> Computer Science graduate student at Western Kentucky University</p>
              <p>> Building web applications with React, Node.js, Django</p>
              <p>> Graduate Assistant teaching CS180: Introduction to Java</p>
            </div>

            <div className="terminal-menu">
              <p className="menu-header">SELECT OPTION:</p>
              <div className="menu-items">
                {menuItems.map((item, index) => (
                  <div
                    key={item.path}
                    className={`menu-item ${selectedIndex === index ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedIndex(index);
                      navigate(item.path);
                    }}
                  >
                    <span className="menu-selector">{selectedIndex === index ? '>' : ' '}</span>
                    <span className="menu-label">[{item.label}]</span>
                    <span className="menu-description">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="terminal-footer">
              <div className="footer-line">────────────────────────────────────────────────────────</div>
              <p className="navigation-hint">
                <span className="key">↑↓</span> Navigate
                <span className="key-separator">│</span>
                <span className="key">ENTER</span> Select
              </p>
            </div>
          </div>
        )}

        <span className="cursor-blink">_</span>
      </div>
    </div>
  );
};

export default HomeProfessional;
