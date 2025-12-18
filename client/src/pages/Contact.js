import React from 'react';
import ContactForm from '../components/ContactForm';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <div className="terminal-line">
          <span className="terminal-prompt">user@portfolio:~$</span>
          <span className="terminal-command">./contact.sh</span>
        </div>
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-subtitle">
          Have a project in mind or want to collaborate? Let's connect!
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-form-section">
          <div className="form-header">
            <span className="form-prompt">{'>'}</span>
            <span className="form-title">Send Message</span>
          </div>
          <ContactForm />
        </div>

        <div className="contact-info-section">
          <div className="info-header">
            <span className="info-prompt">{'>'}</span>
            <span className="info-title">Contact Information</span>
          </div>

          <div className="info-content">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <a href="mailto:grantjones526@outlook.com" className="info-value">
                grantjones526@outlook.com
              </a>
            </div>

            <div className="info-item">
              <span className="info-label">Location:</span>
              <span className="info-value">Bowling Green, KY</span>
            </div>

            <div className="info-item">
              <span className="info-label">Phone:</span>
              <a href="tel:270-978-5042" className="info-value">
                270-978-5042
              </a>
            </div>

            <div className="info-item">
              <span className="info-label">Response Time:</span>
              <span className="info-value">Usually within 24 hours</span>
            </div>
          </div>

          <div className="info-divider"></div>

          <div className="social-links">
            <h3 className="social-title">
              <span className="social-icon">@</span> Social Links
            </h3>
            <div className="social-list">
              <a
                href="https://github.com/grantjones-526"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="link-bracket">{'['}</span>
                <span className="link-icon">{'<>'}</span> GitHub
                <span className="link-bracket">{']'}</span>
              </a>
              <a
                href="https://linkedin.com/in/grant-jones-cs"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="link-bracket">{'['}</span>
                <span className="link-icon">in</span> LinkedIn
                <span className="link-bracket">{']'}</span>
              </a>
            </div>
          </div>

          <div className="terminal-box">
            <div className="terminal-box-header">
              <span className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </span>
              <span className="terminal-box-title">terminal</span>
            </div>
            <div className="terminal-box-content">
              <p className="terminal-line">
                <span className="terminal-prompt">$</span> Looking forward to
                hearing from you!
              </p>
              <p className="terminal-line">
                <span className="terminal-prompt">$</span> Whether it's about a
                project, opportunity, or just to say hi
              </p>
              <p className="terminal-line">
                <span className="terminal-prompt">$</span> Feel free to reach out
                <span className="cursor-blink">_</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
