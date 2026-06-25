import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Projects from './components/Projects';

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
    <Router>
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Contact />
            </>
          } />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
      <footer style={footerStyle}>
        <div style={footerInnerStyle}>
          <p style={footerTextStyle}>
            © {year} Mian Ammar Salar. All rights reserved. Designed with visual
            excellence and clean React modules.
          </p>
        </div>
      </footer>
    </Router>
  );
}