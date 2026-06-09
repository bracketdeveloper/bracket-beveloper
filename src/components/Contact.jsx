import { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { fetchContact } from '../utils/api';

const defaultContactData = {
  title: "Let's Connect",
  description:
    'I am currently open to contracting opportunities, senior technical roles, or architectural consultancies. Feel free to shoot over a message.',
  email: 'mianammarsalar@gmail.com',
  location: 'Lahore, Pakistan (Remote Friendly)',
  socials: [
    { name: 'GitHub', url: 'https://github.com/bracketdeveloper' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mianammarsalar' },
  ],
};

export default function Contact() {
  const [contactData, setContactData] = useState(defaultContactData);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const loadContact = async () => {
      try {
        const result = await fetchContact();
        setContactData(result);
      } catch (err) {
        console.error('Contact API failed:', err);
      }
    };

    loadContact();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required';
    if (!form.email.trim()) next.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please provide a valid email format';
    }
    if (!form.subject.trim()) next.subject = 'Subject line is required';
    if (!form.message.trim()) next.message = 'Message content cannot be blank';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="section contact-section">
      <h2 className="section-title">Get In Touch</h2>
      <p className="section-subtitle">
        Have an exciting engineering problem, an architectural challenge, or a
        full-stack project idea? Let&apos;s talk.
      </p>

      <div className="contact-grid">
        <div className="contact-details-panel glass-card">
          <h3 className="contact-panel-title">{contactData.title}</h3>
          <p className="contact-panel-desc">{contactData.description}</p>

          <div className="contact-items">
            <div className="contact-info-item copyable" onClick={copyEmail} role="presentation">
              <div className="contact-info-icon">
                <Mail size={20} />
              </div>
              <div className="contact-info-text">
                <span className="info-label">Direct Email</span>
                <span className="info-val">{contactData.email}</span>
              </div>
              <button type="button" className="copy-btn" aria-label="Copy email address to clipboard">
                {copied ? <span className="copied-text">Copied!</span> : <Copy size={16} />}
              </button>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <MapPin size={20} />
              </div>
              <div className="contact-info-text">
                <span className="info-label">Location</span>
                <span className="info-val">{contactData.location}</span>
              </div>
            </div>
          </div>

          <div className="contact-socials-group">
            <h4 className="socials-title">Follow My Engineering Work</h4>
            <div className="socials-links">
              {contactData.socials.map((social) => {
                const icon = social.name.toLowerCase().includes('github') ? (
                  <Github size={22} />
                ) : (
                  <Linkedin size={22} />
                );
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="social-icon-btn"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="contact-form-panel glass-card">
          {success ? (
            <div className="form-success-box">
              <CheckCircle size={60} className="success-icon animate-success" />
              <h3 className="success-heading">Message Dispatched!</h3>
              <p className="success-paragraph">
                Thank you for reaching out. I have received your message and will get
                back to you within 24 hours.
              </p>
              <button type="button" onClick={() => setSuccess(false)} className="btn btn-primary">
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="John Doe"
                    disabled={submitting}
                  />
                  {errors.name && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="john@example.com"
                    disabled={submitting}
                  />
                  {errors.email && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={`form-input ${errors.subject ? 'error' : ''}`}
                  placeholder="Project Inquiry"
                  disabled={submitting}
                />
                {errors.subject && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.subject}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder="Tell me about your project..."
                  disabled={submitting}
                />
                {errors.message && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.message}
                  </span>
                )}
              </div>

              <button type="submit" className="btn btn-primary submit-btn" disabled={submitting}>
                {submitting ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
