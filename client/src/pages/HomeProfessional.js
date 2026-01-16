import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeProfessional.css';

// Module-level variable to track if boot has played
// Resets on page refresh, persists during React Router navigation
let hasBootedThisSession = false;

const HomeProfessional = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Skip boot if already played during this page session
  const [bootComplete, setBootComplete] = useState(hasBootedThisSession);
  const [bootLines, setBootLines] = useState([]);
  const [memoryProgress, setMemoryProgress] = useState(0);
  const [showMemoryBar, setShowMemoryBar] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoadingBar, setShowLoadingBar] = useState(false);

  const menuItems = [
    { label: 'PROJECTS', path: '/projects', description: 'View my work and applications' },
    { label: 'ABOUT', path: '/about', description: 'Education, experience, and skills' },
    { label: 'CONTACT', path: '/contact', description: 'Get in touch' },
  ];

  // Boot sequence with system diagnostics
  useEffect(() => {
    // Skip boot sequence if already played this session
    if (hasBootedThisSession) return;

    const bootSteps = [
      { text: '╔══════════════════════════════════════════════════════════╗', delay: 50 },
      { text: '║  GRANT JONES PORTFOLIO SYSTEM v2.0.25                    ║', delay: 50 },
      { text: '║  Copyright (c) 2025 Grant Jones. All rights reserved.    ║', delay: 50 },
      { text: '╚══════════════════════════════════════════════════════════╝', delay: 50 },
      { text: '', delay: 150 },
      { text: 'BIOS Date: 01/13/2025  Ver: 2.0.25', delay: 100 },
      { text: 'CPU: Developer Brain @ 3.5GHz', delay: 120 },
      { text: 'Memory Test:', delay: 100, action: 'startMemory' },
      { text: '', delay: 1000, action: 'waitMemory' },
      { text: '32768 MB OK', delay: 120 },
      { text: '', delay: 100 },
      { text: 'Detecting IDE drives...', delay: 180 },
      { text: '  Primary Master: REACT-SSD 256GB', delay: 120 },
      { text: '  Primary:        NODE-HDD 512GB', delay: 120 },
      { text: '  Secondary:      PYTHON-NVME 1TB', delay: 120 },
      { text: '', delay: 150 },
      { text: 'ENTER PASSWORD NOW:', delay: 100, action: 'pause' },
      { text: '', delay: 500 },
      { text: '> ************', delay: 50, action: 'slowType' },
      { text: '> ACCESS GRANTED', delay: 200 },
      { text: '', delay: 150 },
      { text: 'Loading modules:', delay: 100, action: 'startLoading' },
      { text: '', delay: 1200, action: 'waitLoading' },
      { text: '', delay: 100 },
      { text: '[OK] React Framework initialized', delay: 120 },
      { text: '[OK] Node.js backend connected', delay: 120 },
      { text: '[OK] Portfolio data loaded', delay: 120 },
      { text: '', delay: 150 },
      { text: 'System ready. Welcome, visitor.', delay: 100 },
      { text: '', delay: 200, action: 'complete' },
    ];

    let stepIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let timeoutId;

    const processStep = () => {
      if (stepIndex >= bootSteps.length) {
        setBootComplete(true);
        hasBootedThisSession = true;
        return;
      }

      const step = bootSteps[stepIndex];

      // Handle special actions
      if (step.action === 'startMemory') {
        setShowMemoryBar(true);
        setMemoryProgress(0);
      } else if (step.action === 'startLoading') {
        setShowLoadingBar(true);
        setLoadingProgress(0);
      } else if (step.action === 'complete') {
        setBootComplete(true);
        hasBootedThisSession = true;
        return;
      }

      // Type character by character for regular text
      if (step.action === 'slowType' && charIndex < step.text.length) {
        currentText = step.text.substring(0, charIndex + 1);
        setBootLines(prev => {
          const newLines = [...prev];
          newLines[stepIndex] = currentText;
          return newLines;
        });
        charIndex++;
        timeoutId = setTimeout(processStep, 40);
        return;
      }

      // Add complete line
      if (step.text !== '' || stepIndex === 0) {
        setBootLines(prev => [...prev, step.text]);
      } else {
        setBootLines(prev => [...prev, '']);
      }

      stepIndex++;
      charIndex = 0;
      currentText = '';
      timeoutId = setTimeout(processStep, step.delay);
    };

    timeoutId = setTimeout(processStep, 300);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memory progress animation
  useEffect(() => {
    if (!showMemoryBar || memoryProgress >= 100) return;

    const interval = setInterval(() => {
      setMemoryProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [showMemoryBar, memoryProgress]);

  // Loading progress animation
  useEffect(() => {
    if (!showLoadingBar || loadingProgress >= 100) return;

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 3;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [showLoadingBar, loadingProgress]);

  // Progress bar renderer
  const renderProgressBar = (progress, width = 30) => {
    const filled = Math.floor((progress / 100) * width);
    const empty = width - filled;
    return `[${`█`.repeat(filled)}${`░`.repeat(empty)}] ${progress}%`;
  };

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
        {/* Boot sequence - hidden after complete */}
        {!bootComplete && (
          <div className="boot-sequence">
            {bootLines.map((line, index) => (
              <div key={index} className="boot-line">{line}</div>
            ))}
            {showMemoryBar && memoryProgress < 100 && (
              <div className="boot-line progress-line">
                {renderProgressBar(memoryProgress)}
              </div>
            )}
            {showLoadingBar && loadingProgress < 100 && (
              <div className="boot-line progress-line">
                {renderProgressBar(loadingProgress, 40)}
              </div>
            )}
          </div>
        )}

        {/* Main terminal content */}
        {bootComplete && (
          <div className="terminal-content fade-in">
            <div className="terminal-header">
              <pre className="terminal-ascii-name">{`
 ██████╗ ██████╗  █████╗ ███╗   ██╗████████╗         ██╗ ██████╗ ███╗   ██╗███████╗███████╗
██╔════╝ ██╔══██╗██╔══██╗████╗  ██║╚══██╔══╝         ██║██╔═══██╗████╗  ██║██╔════╝██╔════╝
██║  ███╗██████╔╝███████║██╔██╗ ██║   ██║            ██║██║   ██║██╔██╗ ██║█████╗  ███████╗
██║   ██║██╔══██╗██╔══██║██║╚██╗██║   ██║       ██   ██║██║   ██║██║╚██╗██║██╔══╝  ╚════██║
╚██████╔╝██║  ██║██║  ██║██║ ╚████║   ██║       ╚█████╔╝╚██████╔╝██║ ╚████║███████╗███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝        ╚════╝  ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝
`}</pre>
              <p className="terminal-subtitle">Full Stack Developer & Graduate Student</p>
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

            <div className="terminal-hint">
              Use ↑↓ to navigate, ENTER to select
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProfessional;
