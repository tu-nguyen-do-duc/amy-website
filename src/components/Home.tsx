import React, { useState, useEffect } from 'react';
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
  const { isExploreClicked, setIsExploreClicked } = useExplore();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [randomGalleryImages, setRandomGalleryImages] = useState<string[]>([]);
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
    // Collect all images from all albums and randomize them
    if (isExploreClicked && albums.length > 0) {
      const galleryImages: string[] = [];
      
      // Add all images from all albums
      albums.forEach((album) => {
        album.images.forEach((image) => {
          galleryImages.push(getPhotoPath(album.folderName, image));
        });
      });
      
      // Shuffle the images
      for (let i = galleryImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [galleryImages[i], galleryImages[j]] = [galleryImages[j], galleryImages[i]];
      }
      
      setRandomGalleryImages(galleryImages);
    }
  }, [isExploreClicked, albums]);

  const getPhotoPath = (folderName: string, fileName: string): string => {
    const basePath = process.env.PUBLIC_URL || '/amy-website';
    return `${basePath}/media/${folderName}/${fileName}`;
  };

  const handleExplore = () => {
    setIsExploreClicked(true);
    setTimeout(() => {
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

      {/* Only show content sections after explore is clicked */}
      {isExploreClicked && (
        <>
          {/* Random Gallery Section - Vertical Scroll */}
          {randomGalleryImages.length > 0 ? (
            <section id="gallery" className="random-gallery-section">
              <div className="gallery-container">
                <div className="gallery-vertical">
                  {randomGalleryImages.map((imagePath, index) => (
                    <div key={index} className="gallery-item">
                      <img src={imagePath} alt={`Gallery ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </>
      )}

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
