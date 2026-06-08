import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

const footerStyle = {
  borderTop: '1px solid var(--border-light)',
  padding: '40px 24px',
  background: 'var(--bg-secondary)',
  position: 'relative',
  zIndex: 2,
};

const footerInnerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  textAlign: 'center',
};

const footerTextStyle = {
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
  fontWeight: 500,
};

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const year = new Date().getFullYear();

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer style={footerStyle}>
        <div style={footerInnerStyle}>
          <p style={footerTextStyle}>
            © {year} Mian Ammar Salar. All rights reserved. Designed with visual
            excellence and clean React modules.
          </p>
        </div>
      </footer>
    </>
  );
}
