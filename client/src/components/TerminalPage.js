import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TerminalPage.css';

const TerminalPage = ({ title, children }) => {
  const navigate = useNavigate();

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' || e.key === 'Backspace') {
      // Don't navigate if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="terminal-page">
      <div className="terminal-page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          {'<'} BACK
        </button>
        <h1 className="page-title">{title}<span className="cursor-blink">_</span></h1>
        <div className="header-border">════════════════════════════════════════════════════════════════</div>
      </div>
      <div className="terminal-page-content">
        {children}
      </div>
      <div className="terminal-page-footer">
        <div className="footer-border">────────────────────────────────────────────────────────────────</div>
        <p className="navigation-hint">
          <span className="key">ESC</span> Back to main menu
        </p>
      </div>
    </div>
  );
};

export default TerminalPage;
