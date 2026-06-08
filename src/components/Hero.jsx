import { useEffect, useState } from 'react';
import {
  ArrowDown,
  Database,
  FileCode,
  Layers,
  Layout,
  Server,
} from 'lucide-react';

const typedRoles = [
  'Full-Stack Engineer',
  'MERN & Laravel Specialist',
  'Backend Architect',
  'UI/UX Implementer',
];

const floatingBadges = [
  { className: 'badge-left-1', icon: Server, label: 'Node.js' },
  { className: 'badge-right-1', icon: Layout, label: 'React.js' },
  { className: 'badge-left-2', icon: Layers, label: 'Laravel' },
  { className: 'badge-right-2', icon: FileCode, label: 'Vue.js' },
  { className: 'badge-left-3', icon: FileCode, label: 'PHP' },
  { className: 'badge-right-3', icon: Database, label: 'MySQL' },
  { className: 'badge-left-4', icon: Layout, label: 'WordPress' },
  { className: 'badge-right-4', icon: Database, label: 'MongoDB' },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const current = typedRoles[roleIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.substring(0, typedText.length + 1);
        setTypedText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        const next = current.substring(0, typedText.length - 1);
        setTypedText(next);
        if (next === '') {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % typedRoles.length);
          setSpeed(100);
        }
      }
      setSpeed(deleting ? 50 : 100);
    }, speed);

    return () => clearTimeout(timeout);
  }, [typedText, deleting, roleIndex, speed]);

  return (
    <section id="home" className="hero-section">
      <div className="bg-grid" />
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />
      <div className="glow-orb orb-3" />

      <div className="hero-container">
        <div className="floating-icons-container">
          {floatingBadges.map(({ className, icon: Icon, label }) => (
            <div key={label} className={`floating-badge ${className}`}>
              <Icon size={18} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="hero-content">
          <h4 className="hero-tagline">DEVELOPING SCALABLE SOLUTIONS</h4>
          <h1 className="hero-title">
            Hi, I&apos;m <span className="highlight-text">Mian Ammar Salar</span>
          </h1>
          <h2 className="hero-subtitle">
            I am a <span className="typed-text">{typedText}</span>
            <span className="cursor">|</span>
          </h2>
          <p className="hero-description">
            I design and architect high-performance full-stack web applications,
            combining rock-solid backend frameworks like Laravel and Node.js with
            modern, responsive user interfaces.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              Explore Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll to About Me section">
        <ArrowDown size={22} className="arrow-icon" />
      </a>
    </section>
  );
}
