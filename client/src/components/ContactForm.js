import React, { useState } from 'react';
import { submitContact } from '../services/api';
import '../styles/Contact.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Name is required' });
      return false;
    }
    if (!formData.email.trim()) {
      setStatus({ type: 'error', message: 'Email is required' });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Invalid email format' });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ type: 'error', message: 'Message is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitContact(formData);
      setStatus({ type: 'success', message: response.message || 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Failed to send message' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          <span className="label-prompt">{'>'}</span> Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter your name..."
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          <span className="label-prompt">{'>'}</span> Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          placeholder="your.email@example.com"
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          <span className="label-prompt">{'>'}</span> Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Type your message here..."
          rows="6"
          disabled={isSubmitting}
        />
      </div>

      {status.message && (
        <div className={`form-status form-status-${status.type}`}>
          <span className="status-icon">
            {status.type === 'success' ? '✓' : '✗'}
          </span>
          {status.message}
        </div>
      )}

      <button
        type="submit"
        className="form-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span> Sending...
          </>
        ) : (
          <>
            <span className="submit-icon">{'>'}</span> Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
