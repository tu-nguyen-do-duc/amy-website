import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// @ts-ignore: allow side-effect CSS import without type declarations
import './App.css';
import Home from './components/Home';
import Projects from './components/Projects';
import { ExploreProvider, useExplore } from './ExploreContext';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const isProjectRoute = location.pathname.startsWith('/projects');
  const { isExploreClicked } = useExplore();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (isProjectRoute) {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <div className="App">
      {isExploreClicked && (
        <header className="header">
          <div className="container">
            <nav className="navigation">
              <a onClick={() => handleNavClick('home')} className="nav-link">Home</a>
              <a onClick={() => handleNavClick('digitals')} className="nav-link">Digitals</a>
              <a onClick={() => handleNavClick('work')} className="nav-link">Work</a>
              <a onClick={() => handleNavClick('contact')} className="nav-link">Contact</a>
            </nav>
          </div>
        </header>
      )}
      
      <main className={`main-content ${isExploreClicked ? 'header-visible' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:albumId" element={<Projects />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ExploreProvider>
      <BrowserRouter basename="/amy-website">
        <AppContent />
      </BrowserRouter>
    </ExploreProvider>
  );
}

export default App;
