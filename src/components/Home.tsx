import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
// @ts-ignore: allow side-effect CSS import without type declarations
import './Home.css';
import { useExplore } from '../ExploreContext';

interface Album {
  id: number;
  title: string;
  description: string;
  folderName: string;
  images: string[];
  photographer?: string;
  date?: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isExploreClicked, setIsExploreClicked } = useExplore();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [randomImageIndices, setRandomImageIndices] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Initialize EmailJS
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

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
      // Generate indices for hero image and 4 digital photos
      for (let i = 0; i < 5; i++) {
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

  const handleExplore = () => {
    setIsExploreClicked(true);
    setTimeout(() => {
      document.getElementById('digitals')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getRandomImage = (albumIndex: number) => {
    if (albums.length === 0 || randomImageIndices.length === 0) return '';
    const album = albums[albumIndex % albums.length];
    const randomImageIndex = randomImageIndices[albumIndex] || 0;
    return getPhotoPath(album.folderName, album.images[randomImageIndex]);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

      if (!serviceId || !templateId) {
        throw new Error('EmailJS credentials not configured');
      }

      await emailjs.send(serviceId, templateId, {
        to_email: 'nguyendoductu@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">AMY AN</h1>
          <p className="hero-subtitle">MODEL PORTFOLIO</p>
          <button 
            className="explore-button" 
            onClick={handleExplore}
          >
            EXPLORE
          </button>
        </div>
        <div className="hero-image-placeholder">
          <img src={`${process.env.PUBLIC_URL || '/amy-website'}/media/NEY 2/DSCF4556.jpeg`} alt="Hero" className="hero-image" />
        </div>
      </section>



      {/* Digitals Section */}
      {isExploreClicked ? (
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
      ) : null}

      {/* Work/Projects Section */}
      {isExploreClicked ? (
        <section id="work" className="work-section">
        <div className="container">
          <div className="section-header">
            <h2>WORK</h2>
            <p>Professional photoshoots and campaigns</p>
          </div>
          
          <div className="albums-grid">
            {albums.map((album) => {
              const coverImage = getPhotoPath(album.folderName, album.images[0]);
              return (
                <div 
                  key={album.id} 
                  className="album-card" 
                  onClick={() => navigate(`/projects/${album.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="album-cover">
                    <img src={coverImage} alt={album.title} />
                    <div className="album-overlay">
                      <h3>{album.title}</h3>
                      <p>{album.description}</p>
                      <span className="photo-count">{album.images.length} photos</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </section>
      ) : null}

      {/* Contact Section */}
      {isExploreClicked ? (
        <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2>CONTACT</h2>
            <p>Get in touch with me</p>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={6}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
              </button>

              {formStatus === 'success' && (
                <p className="form-message success">Message sent successfully!</p>
              )}
              {formStatus === 'error' && (
                <p className="form-message error">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
        </section>
      ) : null}
    </div>
  );
};

export default Home;
