import React from 'react';
import TerminalPage from '../components/TerminalPage';
import ContactForm from '../components/ContactForm';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <TerminalPage title="CONTACT">
      <p className="section-description">> Have a project, collaboration, or employment opportunity? Let's connect!</p>

      <div className="contact-grid">
        <div className="contact-form-section">
          <h2 className="section-title">> SEND MESSAGE</h2>
          <ContactForm />
        </div>

        <div className="contact-info-section">
          <h2 className="section-title">> CONTACT INFO</h2>

          <div className="info-list">
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
              <a href="https://github.com/grantjones-526" target="_blank" rel="noopener noreferrer" className="terminal-link">
                [GITHUB]
              </a>
              <a href="https://linkedin.com/in/grant-jones-cs" target="_blank" rel="noopener noreferrer" className="terminal-link">
                [LINKEDIN]
              </a>
            </div>
          </div>
        </div>
      </div>
    </TerminalPage>
  );
};

export default Contact;
