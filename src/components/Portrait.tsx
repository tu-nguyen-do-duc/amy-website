import React from 'react';
import './Portrait.css';

const Portrait: React.FC = () => {
  return (
    <div className="portrait">
      <div className="container">
        <div className="page-header">
          <h2>Portrait</h2>
          <p>Professional portrait photography</p>
        </div>
        
        <div className="portrait-gallery">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="portrait-item">
              <img 
                src={`/images/portrait-${index + 1}.jpg`} 
                alt={`Amy An Cartwright - Portrait ${index + 1}`} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portrait;