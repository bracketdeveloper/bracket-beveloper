import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Projects from './components/Projects';

// Simple Maintenance Component
const MaintenancePage = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    textAlign: 'center',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)'
  }}>
    <div>
      <h1>Site Under Construction</h1>
      <p>We are currently integrating new backend features. Check back soon!</p>
    </div>
  </div>
);

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  
  // ADD THIS LINE: Toggle this to 'false' when you are done
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      {maintenanceMode ? (
        <MaintenancePage />
      ) : (
        <>
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
          {/* Footer code here */}
        </>
      )}
    </Router>
  );
}