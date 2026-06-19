import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// @ts-ignore: allow side-effect CSS import without type declarations
import './App.css';
import Home from './components/Home';
import Digitals from './components/Digitals';
import Work from './components/Work';
import Projects from './components/Projects';
import { ExploreProvider, useExplore } from './ExploreContext';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const isProjectRoute = location.pathname.startsWith('/projects');
  const { isExploreClicked, playingVideoId, setPlayingVideoId, videos } = useExplore();

  const handleNavClick = (path: string) => {
    if (path === '/#contact') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="App">
      {isExploreClicked && (
        <header className="header">
          <div className="container">
            <nav className="navigation">
              <a onClick={() => handleNavClick('/')} className="nav-link">Home</a>
              <a onClick={() => handleNavClick('/digitals')} className="nav-link">Digitals</a>
              <a onClick={() => handleNavClick('/work')} className="nav-link">Work</a>
              <a onClick={() => handleNavClick('/#contact')} className="nav-link">Contact</a>
            </nav>
          </div>
        </header>
      )}
      {isExploreClicked && (
        <main className={`main-content ${isExploreClicked ? 'header-visible' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/digitals" element={<Digitals />} />
            <Route path="/work" element={<Work />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:albumId" element={<Projects />} />
          </Routes>
        </main>
      )}
      {!isExploreClicked && (
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:albumId" element={<Projects />} />
          </Routes>
        </main>
      )}

      {/* Video Modal - Rendered at App level so it never unmounts */}
      {playingVideoId !== null && (
        <div className="video-modal" onClick={() => setPlayingVideoId(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setPlayingVideoId(null)}>✕</button>
            {videos.find(v => v.id === playingVideoId) && (
              <div className="video-player">
                <video controls autoPlay width="100%" height="100%" style={{ maxWidth: '100%', maxHeight: '90vh' }}>
                  <source src={`${process.env.PUBLIC_URL || '/amy-website'}/media/${videos.find(v => v.id === playingVideoId)?.fileName}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </div>
      )}
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
