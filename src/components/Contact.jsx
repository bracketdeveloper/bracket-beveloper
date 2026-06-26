import { useState, useEffect } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { fetchContact } from "../services/api";

const defaultContactData = {
  title: "Let's Connect",
  description:
    'I am currently open to contracting opportunities, senior technical roles, or architectural consultancies. Feel free to shoot over a message.',
  email: 'mianammarsalar@gmail.com',
  phone: '+92 315 7907337',
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchContact();

        console.log("API RESPONSE:", response);

        const res = response?.data || response;

        if (res && (res.email || res.phone)) {
          setContactData({
            ...defaultContactData,
            email: res.email ?? defaultContactData.email,
            phone: res.phone ?? defaultContactData.phone,
            location: res.location ?? defaultContactData.location,
            socials: [
              {
                name: 'GitHub',
                url: res.github_url ?? defaultContactData.socials[0].url,
              },
              {
                name: 'LinkedIn',
                url: res.linkedin_url ?? defaultContactData.socials[1].url,
              },
            ],
          });
        }
      } catch (err) {
        console.error("API failed, using fallback:", err);
      }
    };

    loadData();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              <button type="button" className="copy-btn">
                {copied ? <span className="copied-text">Copied!</span> : <Copy size={16} />}
              </button>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Phone size={20} />
              </div>
              <div className="contact-info-text">
                <span className="info-label">Phone Number</span>
                <span className="info-val">{contactData.phone}</span>
              </div>
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
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    disabled={submitting}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    disabled={submitting}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={`form-input ${errors.subject ? 'error' : ''}`}
                  disabled={submitting}
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Your Message</label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  disabled={submitting}
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
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