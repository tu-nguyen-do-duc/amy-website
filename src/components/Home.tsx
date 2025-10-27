import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">AMY AN</h1>
          <p className="hero-subtitle">MODEL PORTFOLIO</p>
          <button 
            className="explore-button" 
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          >
            EXPLORE
          </button>
        </div>
        <div className="hero-image-placeholder">
          <span className="image-placeholder-text">Hero Image</span>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <h2>PORTFOLIO</h2>
            <p>A curated selection of editorial and commercial work</p>
          </div>
          
          <div className="portfolio-grid">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="portfolio-item">
                <div className="portfolio-placeholder">
                  <span>Portrait {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digitals Section */}
      <section id="digitals" className="digitals-section">
        <div className="container">
          <div className="section-header">
            <h2>DIGITALS</h2>
            <p>Professional digitals and measurements</p>
          </div>
          
          <div className="digitals-content">
            <div className="measurements-box">
              <h3>MEASUREMENTS</h3>
              <div className="measurements">
                <div className="measurement-item">
                  <span className="label">Height</span>
                  <span className="value">5'9" / 175 cm</span>
                </div>
                <div className="measurement-item">
                  <span className="label">Bust</span>
                  <span className="value">32" / 81 cm</span>
                </div>
                <div className="measurement-item">
                  <span className="label">Waist</span>
                  <span className="value">24" / 61 cm</span>
                </div>
                <div className="measurement-item">
                  <span className="label">Hips</span>
                  <span className="value">34" / 86 cm</span>
                </div>
                <div className="measurement-item">
                  <span className="label">Dress Size</span>
                  <span className="value">US 2 / EU 34</span>
                </div>
                <div className="measurement-item">
                  <span className="label">Shoe Size</span>
                  <span className="value">US 8 / EU 38</span>
                </div>
                <div className="measurement-item">
                  <span className="label">Hair Color</span>
                  <span className="value">Brunette</span>
                </div>
                <div className="measurement-item">
                  <span className="label">Eye Color</span>
                  <span className="value">Brown</span>
                </div>
              </div>
            </div>
            
            <div className="digitals-photos">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="digital-photo-item">
                  <div className="photo-placeholder">
                    <span>Digital {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work/Projects Section */}
      <section id="work" className="work-section">
        <div className="container">
          <div className="section-header">
            <h2>WORK</h2>
            <p>Selected projects and campaigns</p>
          </div>
          
          <div className="work-grid">
            <div className="work-item">
              <div className="work-cover">
                <div className="photo-placeholder">
                  <span>Summer Editorial</span>
                </div>
              </div>
              <div className="work-info">
                <h3>Summer Editorial</h3>
                <p>Beach and lifestyle photography</p>
                <span className="work-date">July 2024</span>
              </div>
            </div>

            <div className="work-item">
              <div className="work-cover">
                <div className="photo-placeholder">
                  <span>Fashion Week</span>
                </div>
              </div>
              <div className="work-info">
                <h3>Fashion Week</h3>
                <p>High fashion runway</p>
                <span className="work-date">September 2024</span>
              </div>
            </div>

            <div className="work-item">
              <div className="work-cover">
                <div className="photo-placeholder">
                  <span>Urban Lifestyle</span>
                </div>
              </div>
              <div className="work-info">
                <h3>Urban Lifestyle</h3>
                <p>Street style photography</p>
                <span className="work-date">October 2024</span>
              </div>
            </div>

            <div className="work-item">
              <div className="work-cover">
                <div className="photo-placeholder">
                  <span>Beauty Campaign</span>
                </div>
              </div>
              <div className="work-info">
                <h3>Beauty Campaign</h3>
                <p>Commercial beauty shoot</p>
                <span className="work-date">November 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2>CONTACT</h2>
            <p>Coming Soon</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
