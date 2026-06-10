import React, { useState, useEffect } from 'react';
import './Digitals.css';

interface Album {
  id: number;
  title: string;
  description: string;
  folderName: string;
  images: string[];
  photographer?: string;
  date?: string;
}

const Digitals: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [randomImageIndices, setRandomImageIndices] = useState<number[]>([]);

  useEffect(() => {
    // Load manifest
    const basePath = process.env.PUBLIC_URL || '/amy-website';
    fetch(`${basePath}/images-manifest.json`)
      .then(res => res.json())
      .then(data => setAlbums(data.albums))
      .catch(err => console.error('Failed to load manifest:', err));
  }, []);

  useEffect(() => {
    // Generate random image indices when albums are loaded
    if (albums.length > 0) {
      const indices = [];
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * albums[i % albums.length].images.length);
        indices.push(randomIndex);
      }
      setRandomImageIndices(indices);
    }
  }, [albums]);

  const getPhotoPath = (folderName: string, fileName: string): string => {
    const basePath = process.env.PUBLIC_URL || '/amy-website';
    return `${basePath}/media/${folderName}/${fileName}`;
  };

  const getRandomImage = (albumIndex: number) => {
    if (albums.length === 0 || randomImageIndices.length === 0) return '';
    const album = albums[albumIndex % albums.length];
    const randomImageIndex = randomImageIndices[albumIndex] || 0;
    return getPhotoPath(album.folderName, album.images[randomImageIndex]);
  };

  return (
    <div className="digitals-page">
      <section className="digitals-section">
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
                  <span className="value">158 cm</span>
                </div>
                <div className="measurement-item">
                  <span className="label">Bust</span>
                  <span className="value">79 cm</span>
                </div>
                <div className="measurement-item">
                  <span className="label">Waist</span>
                  <span className="value">60 cm</span>
                </div>
                <div className="measurement-item">
                  <span className="label">Hips</span>
                  <span className="value">103 cm</span>
                </div>
                <div className="measurement-item">
                  <span className="label">Dress Size</span>
                  <span className="value">XXS</span>
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
              {albums.length > 0 && [...Array(4)].map((_, index) => (
                <div key={index} className="digital-photo-item">
                  <img src={getRandomImage(index + 1)} alt={`Digital ${index + 1}`} className="digital-image" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Digitals;
