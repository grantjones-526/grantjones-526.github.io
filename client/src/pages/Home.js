import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const Home = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Grant Jones';

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="terminal-header">
          <span className="terminal-prompt">user@portfolio:~$</span>
          <span className="terminal-command">whoami</span>
        </div>

        <h1 className="hero-title">
          {text}
          {showCursor && <span className="typing-cursor">_</span>}
        </h1>

        <div className="hero-subtitle">
          <span className="subtitle-label">role:</span>
          <span className="subtitle-value">Graduate Student & Software Developer</span>
        </div>

        <div className="hero-subtitle">
          <span className="subtitle-label">specialization:</span>
          <span className="subtitle-value">AI/ML & Full Stack Development</span>
        </div>

        <div className="hero-subtitle">
          <span className="subtitle-label">location:</span>
          <span className="subtitle-value">Bowling Green, KY</span>
        </div>

        <div className="hero-subtitle">
          <span className="subtitle-label">status:</span>
          <span className="subtitle-value status-active">Graduate Assistant at WKU</span>
        </div>

        <div className="hero-description">
          <p>
            Computer Science graduate student at Western Kentucky University with a passion for
            building intelligent applications. Experienced in machine learning, full-stack development,
            and creating innovative solutions using Python, Django, and React.
          </p>
        </div>

        <div className="hero-actions">
          <Link to="/projects" className="hero-button hero-button-primary">
            <span className="button-icon">{'>'}</span> View Projects
          </Link>
          <Link to="/contact" className="hero-button hero-button-secondary">
            <span className="button-icon">@</span> Contact Me
          </Link>
        </div>

        <div className="hero-links">
          <a
            href="https://github.com/grantjones-526"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link"
          >
            <span className="link-bracket">{'['}</span>
            GitHub
            <span className="link-bracket">{']'}</span>
          </a>
          <a
            href="https://linkedin.com/in/grant-jones-cs"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link"
          >
            <span className="link-bracket">{'['}</span>
            LinkedIn
            <span className="link-bracket">{']'}</span>
          </a>
        </div>
      </div>

      <div className="terminal-footer">
        <span className="terminal-prompt">$</span>
        <span className="terminal-text">cd projects && ls -la</span>
      </div>
    </div>
  );
};

export default Home;
