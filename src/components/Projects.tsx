import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @ts-ignore: allow side-effect CSS import without type declarations
import './Projects.css';

interface Album {
  id: number;
  title: string;
  description: string;
  folderName: string;
  images: string[];
  photographer?: string;
  date?: string;
}

interface ViewState {
  focusedPhotoIndex: number | null;
}

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { albumId } = useParams<{ albumId?: string }>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [viewState, setViewState] = useState<ViewState>({
    focusedPhotoIndex: null,
  });

  useEffect(() => {
    // Load manifest
    const basePath = process.env.PUBLIC_URL || '/amy-website';
    fetch(`${basePath}/images-manifest.json`)
      .then(res => res.json())
      .then(data => setAlbums(data.albums))
      .catch(err => console.error('Failed to load manifest:', err));
  }, []);

  // Helper function to generate photo paths
  const getPhotoPath = (folderName: string, fileName: string): string => {
    const basePath = process.env.PUBLIC_URL || '/amy-website';
    return `${basePath}/media/${folderName}/${fileName}`;
  };

  // Get current album if viewing album detail
  const currentAlbum = albumId ? albums.find(a => a.id === parseInt(albumId)) : null;

  const openAlbum = (album: Album) => {
    navigate(`/projects/${album.id}`);
  };

  const closeAlbum = () => {
    navigate('/work');
  };

  const openFocusedPhoto = (index: number) => {
    setViewState({ focusedPhotoIndex: index });
  };

  const closeFocusedPhoto = () => {
    setViewState({ focusedPhotoIndex: null });
  };

  const goToPreviousPhoto = () => {
    if (viewState.focusedPhotoIndex !== null && viewState.focusedPhotoIndex > 0) {
      setViewState({
        focusedPhotoIndex: viewState.focusedPhotoIndex - 1
      });
    }
  };

  const goToNextPhoto = () => {
    if (currentAlbum && viewState.focusedPhotoIndex !== null && 
        viewState.focusedPhotoIndex < currentAlbum.images.length - 1) {
      setViewState({
        focusedPhotoIndex: viewState.focusedPhotoIndex + 1
      });
    }
  };

  // Focused photo modal view
  if (currentAlbum && viewState.focusedPhotoIndex !== null) {
    const currentPhotoIndex = viewState.focusedPhotoIndex;
    const currentPhotoPath = getPhotoPath(currentAlbum.folderName, currentAlbum.images[currentPhotoIndex]);
    const isFirstPhoto = currentPhotoIndex === 0;
    const isLastPhoto = currentPhotoIndex === currentAlbum.images.length - 1;

    return (
      <div className="focused-photo-modal">
        <button className="close-button" onClick={closeFocusedPhoto}>✕</button>
        
        <div className="photo-container">
          <button 
            className="nav-button prev-button"
            onClick={goToPreviousPhoto}
            disabled={isFirstPhoto}
            title="Previous photo"
          >
            ←
          </button>
          
          <img src={currentPhotoPath} alt={`${currentAlbum.title} - Photo ${currentPhotoIndex + 1}`} />
          
          <button 
            className="nav-button next-button"
            onClick={goToNextPhoto}
            disabled={isLastPhoto}
            title="Next photo"
          >
            →
          </button>
        </div>
        
        <div className="photo-info">
          <p>{currentPhotoIndex + 1} / {currentAlbum.images.length}</p>
        </div>
      </div>
    );
  }

  // Album detail view
  if (currentAlbum) {
    return (
      <div className="album-view">
        <div className="container">
          <div className="album-header">
            <button className="back-button" onClick={closeAlbum}>
              ← Back to Work
            </button>
            <h1>Projects</h1>
            <h2>{currentAlbum.title}</h2>
            <p>{currentAlbum.description}</p>
            <div className="album-meta">
              {currentAlbum.photographer && <span>Photographer: {currentAlbum.photographer}</span>}
              {currentAlbum.date && <span>Date: {currentAlbum.date}</span>}
            </div>
          </div>
          
          <div className="album-gallery">
            {currentAlbum.images.map((image, index) => {
              const photoPath = getPhotoPath(currentAlbum.folderName, image);
              return (
                <div 
                  key={index} 
                  className="album-photo"
                  onClick={() => openFocusedPhoto(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={photoPath} alt={`${currentAlbum.title} - Photo ${index + 1}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Grid view (album list)
  return (
    <div className="projects">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <div className="page-header">
          <h2>Projects</h2>
          <p>A collection of professional photoshoots and campaigns</p>
        </div>
        
        <div className="albums-grid">
          {albums.map((album) => {
            const coverImage = getPhotoPath(album.folderName, album.images[0]);
            return (
              <div key={album.id} className="album-card" onClick={() => openAlbum(album)}>
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
    </div>
  );
};

export default Projects;