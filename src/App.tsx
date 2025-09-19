import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import DigitalPictures from './components/DigitalPictures';
import Portrait from './components/Portrait';
import Projects from './components/Projects';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="container">
            <h1 className="model-name">Amy An Cartwright</h1>
            <nav className="navigation">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/digitals" className="nav-link">Digitals</Link>
              <Link to="/portrait" className="nav-link">Portraits</Link>
              <Link to="/projects" className="nav-link">Projects</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/digitals" element={<DigitalPictures />} />
            <Route path="/portrait" element={<Portrait />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<div className="contact-placeholder">Contact page coming soon!</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
