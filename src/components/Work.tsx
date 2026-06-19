import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExplore } from '../ExploreContext';
import './Work.css';

interface Album {
  id: number;
  title: string;
  description: string;
  folderName: string;
  images: string[];
  photographer?: string;
  date?: string;
}

interface Video {
  id: number;
  title: string;
  description: string;
  fileName: string;
  thumbnail?: string;
}

const Work: React.FC = () => {
  const navigate = useNavigate();
  const { playingVideoId, setPlayingVideoId, videos, setVideos } = useExplore();
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    // Load manifest
    const basePath = process.env.PUBLIC_URL || '/amy-website';
    fetch(`${basePath}/images-manifest.json`)
      .then(res => res.json())
      .then(data => {
        console.log('Manifest loaded:', data);
        setAlbums(data.albums);
        if (data.videos) {
          console.log('Videos loaded:', data.videos);
          setVideos(data.videos);
        }
      })
      .catch(err => console.error('Failed to load manifest:', err));
  }, [setVideos]);

  const getPhotoPath = (folderName: string, fileName: string): string => {
    const basePath = process.env.PUBLIC_URL || '/amy-website';
    return `${basePath}/media/${folderName}/${fileName}`;
  };

  return (
    <div className="work-page">
      <section className="work-section">
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
            {videos.map((video) => {
              const videoPath = `${process.env.PUBLIC_URL || '/amy-website'}/media/${video.fileName}`;
              return (
                <div 
                  key={video.id} 
                  className="album-card video-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setPlayingVideoId(video.id)}
                >
                  <div className="album-cover">
                    <video width="100%" height="100%" style={{ objectFit: 'cover' }}>
                      <source src={videoPath} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="album-overlay">
                      <h3>{video.title}</h3>
                      <p>{video.description}</p>
                      <span className="video-badge">▶ VIDEO</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
