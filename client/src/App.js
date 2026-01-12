import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomeProfessional from './pages/HomeProfessional';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles/App.css';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={`app ${isHome ? 'terminal-mode' : 'page-mode'}`}>
      <div className="crt-overlay"></div>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeProfessional />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
