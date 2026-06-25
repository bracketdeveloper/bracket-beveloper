import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Menu, Moon, Sun, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/', isAnchor: false },
  { name: 'About', href: '/#about', isAnchor: true },
  { name: 'Skills', href: '/#skills', isAnchor: true },
  { name: 'Projects', href: '/projects', isAnchor: false },
  { name: 'Experience', href: '/#experience', isAnchor: true },
  { name: 'Contact', href: '/#contact', isAnchor: true },
];

export default function Navbar({ theme, setTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const handleNavClick = (link) => {
    setMobileOpen(false);
    if (link.isAnchor) {
      if (location.pathname !== '/') {
        window.location.href = link.href;
      } else {
        const element = document.querySelector(link.href.replace('/', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="nav-logo">
          <Code2 size={22} className="logo-icon" />
          <span>
            Bracket<span className="logo-accent">Developer</span>
          </span>
        </Link>

        <div className="nav-menu">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <a key={link.name} href={link.href} className="nav-item">
                {link.name}
              </a>
            ) : (
              <Link key={link.name} to={link.href} className="nav-item">
                {link.name}
              </Link>
            )
          ))}
        </div>

        <div className="nav-controls">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle visual theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-trigger"
            aria-label="Toggle navigation drawer"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-links">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-item"
                onClick={() => handleNavClick(link)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="mobile-nav-item"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            )
          ))}
        </div>
      </div>
    </nav>
  );
}