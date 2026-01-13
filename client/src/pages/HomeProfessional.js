import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeProfessional.css';

const HomeProfessional = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
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
    const bootSteps = [
      { text: '╔══════════════════════════════════════════════════════════╗', delay: 100 },
      { text: '║  GRANT JONES PORTFOLIO SYSTEM v2.0.25                    ║', delay: 100 },
      { text: '║  Copyright (c) 2025 Grant Jones. All rights reserved.    ║', delay: 100 },
      { text: '╚══════════════════════════════════════════════════════════╝', delay: 100 },
      { text: '', delay: 250 },
      { text: 'BIOS Date: 01/13/2025  Ver: 2.0.25', delay: 200 },
      { text: 'CPU: Developer Brain @ 3.5GHz', delay: 250 },
      { text: 'Memory Test:', delay: 200, action: 'startMemory' },
      { text: '', delay: 1800, action: 'waitMemory' },
      { text: '32768 MB OK', delay: 250 },
      { text: '', delay: 200 },
      { text: 'Detecting IDE drives...', delay: 350 },
      { text: '  Primary Master: REACT-SSD 256GB', delay: 250 },
      { text: '  Primary Slave:  NODE-HDD 512GB', delay: 250 },
      { text: '  Secondary:      PYTHON-NVME 1TB', delay: 250 },
      { text: '', delay: 250 },
      { text: 'ENTER PASSWORD NOW:', delay: 200, action: 'pause' },
      { text: '', delay: 1000 },
      { text: '> ************', delay: 100, action: 'slowType' },
      { text: '> ACCESS GRANTED', delay: 400 },
      { text: '', delay: 250 },
      { text: 'Loading modules:', delay: 200, action: 'startLoading' },
      { text: '', delay: 2200, action: 'waitLoading' },
      { text: '', delay: 200 },
      { text: '[OK] React Framework initialized', delay: 250 },
      { text: '[OK] Node.js backend connected', delay: 250 },
      { text: '[OK] Portfolio data loaded', delay: 250 },
      { text: '', delay: 250 },
      { text: 'System ready. Welcome, visitor.', delay: 200 },
      { text: '', delay: 400, action: 'complete' },
    ];

    let stepIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let timeoutId;

    const processStep = () => {
      if (stepIndex >= bootSteps.length) {
        setBootComplete(true);
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
        timeoutId = setTimeout(processStep, 80);
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

    timeoutId = setTimeout(processStep, 500);

    return () => clearTimeout(timeoutId);
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
        return prev + 2;
      });
    }, 40);

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
        return prev + 1;
      });
    }, 25);

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
