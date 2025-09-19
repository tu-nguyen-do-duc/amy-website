import React, { useState } from 'react';
import './Projects.css';

interface Album {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  photos: string[];
  photographer?: string;
  date?: string;
}

const Projects: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const albums: Album[] = [
    {
      id: 1,
      title: "Summer Editorial",
      description: "Beach and summer lifestyle editorial shoot",
      coverImage: "/images/summer-cover.jpg",
      photos: [
        "/images/summer-1.jpg",
        "/images/summer-2.jpg",
        "/images/summer-3.jpg",
        "/images/summer-4.jpg",
        "/images/summer-5.jpg",
        "/images/summer-6.jpg"
      ],
      photographer: "Sarah Johnson",
      date: "July 2024"
    },
    {
      id: 2,
      title: "Fashion Week",
      description: "High fashion runway and backstage moments",
      coverImage: "/images/fashion-cover.jpg",
      photos: [
        "/images/fashion-1.jpg",
        "/images/fashion-2.jpg",
        "/images/fashion-3.jpg",
        "/images/fashion-4.jpg",
        "/images/fashion-5.jpg",
        "/images/fashion-6.jpg",
        "/images/fashion-7.jpg",
        "/images/fashion-8.jpg"
      ],
      photographer: "Marco Rodriguez",
      date: "September 2024"
    },
    {
      id: 3,
      title: "Urban Lifestyle",
      description: "Street style and urban photography",
      coverImage: "/images/urban-cover.jpg",
      photos: [
        "/images/urban-1.jpg",
        "/images/urban-2.jpg",
        "/images/urban-3.jpg",
        "/images/urban-4.jpg",
        "/images/urban-5.jpg"
      ],
      photographer: "Alex Chen",
      date: "October 2024"
    },
    {
      id: 4,
      title: "Beauty Campaign",
      description: "Commercial beauty and skincare campaign",
      coverImage: "/images/beauty-cover.jpg",
      photos: [
        "/images/beauty-1.jpg",
        "/images/beauty-2.jpg",
        "/images/beauty-3.jpg",
        "/images/beauty-4.jpg",
        "/images/beauty-5.jpg",
        "/images/beauty-6.jpg",
        "/images/beauty-7.jpg"
      ],
      photographer: "Emma Williams",
      date: "November 2024"
    }
  ];

  const openAlbum = (album: Album) => {
    setSelectedAlbum(album);
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
  };

  if (selectedAlbum) {
    return (
      <div className="album-view">
        <div className="container">
          <div className="album-header">
            <button className="back-button" onClick={closeAlbum}>
              ← Back to Projects
            </button>
            <h2>{selectedAlbum.title}</h2>
            <p>{selectedAlbum.description}</p>
            <div className="album-meta">
              {selectedAlbum.photographer && <span>Photographer: {selectedAlbum.photographer}</span>}
              {selectedAlbum.date && <span>Date: {selectedAlbum.date}</span>}
            </div>
          </div>
          
          <div className="album-gallery">
            {selectedAlbum.photos.map((photo, index) => (
              <div key={index} className="album-photo">
                <img src={photo} alt={`${selectedAlbum.title} - Photo ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects">
      <div className="container">
        <div className="page-header">
          <h2>Projects</h2>
          <p>A collection of professional photoshoots and campaigns</p>
        </div>
        
        <div className="albums-grid">
          {albums.map((album) => (
            <div key={album.id} className="album-card" onClick={() => openAlbum(album)}>
              <div className="album-cover">
                <img src={album.coverImage} alt={album.title} />
                <div className="album-overlay">
                  <h3>{album.title}</h3>
                  <p>{album.description}</p>
                  <span className="photo-count">{album.photos.length} photos</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;