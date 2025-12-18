import React from 'react';
import '../styles/Navbar.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-text">
            Built with React & Node.js
          </span>
        </div>
        <div className="footer-center">
          <span className="footer-text">
            © {currentYear} Grant Jones
          </span>
        </div>
        <div className="footer-right">
          <a
            href="https://github.com/grantjones-526"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          <span className="footer-separator">|</span>
          <a
            href="https://linkedin.com/in/grant-jones-cs"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
