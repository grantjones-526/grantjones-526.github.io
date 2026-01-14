import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TerminalPage from '../components/TerminalPage';
import '../styles/Contact.css';

const Contact = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [backButtonSelected, setBackButtonSelected] = useState(true);
  const itemRefs = useRef([]);

  const links = [
    { label: 'Email', url: 'mailto:grantjones526@outlook.com', type: 'email' },
    { label: 'Phone', url: 'tel:270-978-5042', type: 'phone' },
    { label: 'GITHUB', url: 'https://github.com/grantjones-526', type: 'social' },
    { label: 'LINKEDIN', url: 'https://linkedin.com/in/grant-jones-cs', type: 'social' },
  ];

  const handleKeyDown = useCallback((e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (backButtonSelected) {
          setBackButtonSelected(false);
          setSelectedIndex(links.length - 1);
        } else if (selectedIndex > 0) {
          setSelectedIndex(prev => prev - 1);
        } else {
          setBackButtonSelected(true);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (backButtonSelected) {
          setBackButtonSelected(false);
          setSelectedIndex(0);
        } else if (selectedIndex < links.length - 1) {
          setSelectedIndex(prev => prev + 1);
        } else {
          setBackButtonSelected(true);
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (!backButtonSelected) {
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : links.length - 1));
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (!backButtonSelected) {
          setSelectedIndex(prev => (prev < links.length - 1 ? prev + 1 : 0));
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (backButtonSelected) {
          navigate('/');
        } else {
          const link = links[selectedIndex];
          if (link.type === 'social') {
            window.open(link.url, '_blank');
          } else {
            window.location.href = link.url;
          }
        }
        break;
      default:
        break;
    }
  }, [selectedIndex, links, backButtonSelected, navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (backButtonSelected) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemRefs.current[selectedIndex]) {
      const el = itemRefs.current[selectedIndex];
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (!isVisible) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [selectedIndex, backButtonSelected]);

  return (
    <TerminalPage title="CONTACT" backButtonSelected={backButtonSelected}>
      <p className="section-description">> Have a project, collaboration, or employment opportunity? Let's connect!</p>

      <div className="contact-info-section">
        <h2 className="section-title">> CONTACT INFO</h2>

        <div className="info-list">
          <div
            ref={el => itemRefs.current[0] = el}
            className={`info-item ${selectedIndex === 0 && !backButtonSelected ? 'selected' : ''}`}
            onClick={() => { setBackButtonSelected(false); setSelectedIndex(0); }}
          >
            <span className="info-label">Email:</span>
            <a href="mailto:grantjones526@outlook.com" className="info-value">
              grantjones526@outlook.com
            </a>
          </div>
          <div className="info-item">
            <span className="info-label">Location:</span>
            <span className="info-value">Bowling Green, KY</span>
          </div>
          <div
            ref={el => itemRefs.current[1] = el}
            className={`info-item ${selectedIndex === 1 && !backButtonSelected ? 'selected' : ''}`}
            onClick={() => { setBackButtonSelected(false); setSelectedIndex(1); }}
          >
            <span className="info-label">Phone:</span>
            <a href="tel:270-978-5042" className="info-value">270-978-5042</a>
          </div>
          <div className="info-item">
            <span className="info-label">Response:</span>
            <span className="info-value">Usually within 24 hours</span>
          </div>
        </div>

        <div className="social-links">
          <h3 className="subsection-title">> SOCIAL</h3>
          <div className="link-list">
            <a
              ref={el => itemRefs.current[2] = el}
              href="https://github.com/grantjones-526"
              target="_blank"
              rel="noopener noreferrer"
              className={`terminal-link ${selectedIndex === 2 && !backButtonSelected ? 'selected' : ''}`}
              onClick={() => { setBackButtonSelected(false); setSelectedIndex(2); }}
            >
              [GITHUB]
            </a>
            <a
              ref={el => itemRefs.current[3] = el}
              href="https://linkedin.com/in/grant-jones-cs"
              target="_blank"
              rel="noopener noreferrer"
              className={`terminal-link ${selectedIndex === 3 && !backButtonSelected ? 'selected' : ''}`}
              onClick={() => { setBackButtonSelected(false); setSelectedIndex(3); }}
            >
              [LINKEDIN]
            </a>
          </div>
        </div>
      </div>
    </TerminalPage>
  );
};

export default Contact;
