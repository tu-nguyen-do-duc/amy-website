import React from 'react';
import './DigitalPictures.css';

const DigitalPictures: React.FC = () => {
  return (
    <div className="digital-pictures">
      <div className="container">
        <div className="page-header">
          <h2>Digital Pictures</h2>
          <p>Professional digitals and measurements</p>
        </div>
        
        <div className="content-grid">
          <div className="measurements-section">
            <h3>Measurements</h3>
            <div className="measurements">
              <div className="measurement-item">
                <span className="label">Height:</span>
                <span className="value">158 cm</span>
              </div>
              <div className="measurement-item">
                <span className="label">Bust:</span>
                <span className="value">79 cm</span>
              </div>
              <div className="measurement-item">
                <span className="label">Waist:</span>
                <span className="value">60 cm</span>
              </div>
              <div className="measurement-item">
                <span className="label">Hips:</span>
                <span className="value">103 cm</span>
              </div>
              <div className="measurement-item">
                <span className="label">Dress Size:</span>
                <span className="value">XXS</span>
              </div>
              <div className="measurement-item">
                <span className="label">Shoe Size:</span>
                <span className="value">US 8 / EU 38</span>
              </div>
              <div className="measurement-item">
                <span className="label">Hair Color:</span>
                <span className="value">Brunette</span>
              </div>
              <div className="measurement-item">
                <span className="label">Eye Color:</span>
                <span className="value">Brown</span>
              </div>
            </div>
          </div>
          
          <div className="photos-section">
            <h3>Digital Photos</h3>
            <div className="photo-grid">
              <div className="photo-item">
                <img src="/images/digital-1.jpg" alt="Amy An Cartwright - Digital 1" />
              </div>
              <div className="photo-item">
                <img src="/images/digital-2.jpg" alt="Amy An Cartwright - Digital 2" />
              </div>
              <div className="photo-item">
                <img src="/images/digital-3.jpg" alt="Amy An Cartwright - Digital 3" />
              </div>
              <div className="photo-item">
                <img src="/images/digital-4.jpg" alt="Amy An Cartwright - Digital 4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalPictures;