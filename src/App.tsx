import React from 'react';
import './App.css';
import Home from './components/Home';

function App() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <nav className="navigation">
            <a onClick={() => scrollToSection('home')} className="nav-link">Home</a>
            <a onClick={() => scrollToSection('portfolio')} className="nav-link">Portfolio</a>
            <a onClick={() => scrollToSection('digitals')} className="nav-link">Digitals</a>
            <a onClick={() => scrollToSection('work')} className="nav-link">Work</a>
            <a onClick={() => scrollToSection('contact')} className="nav-link">Contact</a>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        <Home />
      </main>
    </div>
  );
}

export default App;
