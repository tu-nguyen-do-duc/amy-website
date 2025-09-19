import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="home-content">
          {/* Top section - Model photo and info side by side */}
          <div className="main-section">
            <div className="main-photo-placeholder">
              <div className="photo-placeholder-text">
                Model Photo
                <br />
                <span className="placeholder-subtitle">Add Amy's main photo here</span>
              </div>
            </div>
            
            <div className="model-info">
              <h2>Amy An Cartwright</h2>
              <p className="model-tagline">Professional Model</p>
              <div className="quick-stats">
                <div className="stat-item">
                  <span className="stat-label">Height</span>
                  <span className="stat-value">5'9"</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Dress</span>
                  <span className="stat-value">US 2</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Shoe</span>
                  <span className="stat-value">US 8</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom section - Photo grid */}
          <div className="photo-grid-section">
            <div className="home-photo-grid">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="home-photo-item">
                  <div className="photo-placeholder">
                    <span>Photo {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
