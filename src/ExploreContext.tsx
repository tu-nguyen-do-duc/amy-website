import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Video {
  id: number;
  title: string;
  description: string;
  fileName: string;
  thumbnail?: string;
}

interface ExploreContextType {
  isExploreClicked: boolean;
  setIsExploreClicked: (value: boolean) => void;
  playingVideoId: number | null;
  setPlayingVideoId: (value: number | null) => void;
  videos: Video[];
  setVideos: (videos: Video[]) => void;
}

const ExploreContext = createContext<ExploreContextType | undefined>(undefined);

export const ExploreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isExploreClicked, setIsExploreClicked] = useState(false);
  const [playingVideoId, setPlayingVideoIdState] = useState<number | null>(() => {
    // Try sessionStorage first (survives longer during navigation)
    const sessionSaved = sessionStorage.getItem('playingVideoId');
    if (sessionSaved) {
      return parseInt(sessionSaved);
    }
    return null;
  });
  const [videos, setVideosState] = useState<Video[]>(() => {
    // Initialize videos from sessionStorage
    const cached = sessionStorage.getItem('cachedVideos');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error('Failed to parse cached videos:', e);
        return [];
      }
    }
    return [];
  });

  const setPlayingVideoId = (value: number | null) => {
    console.log('Context: Setting playingVideoId:', value);
    setPlayingVideoIdState(value);
    if (value !== null) {
      sessionStorage.setItem('playingVideoId', value.toString());
    } else {
      sessionStorage.removeItem('playingVideoId');
    }
  };

  const setVideos = (videos: Video[]) => {
    console.log('Context: Setting videos:', videos);
    setVideosState(videos);
    sessionStorage.setItem('cachedVideos', JSON.stringify(videos));
  };

  return (
    <ExploreContext.Provider value={{ isExploreClicked, setIsExploreClicked, playingVideoId, setPlayingVideoId, videos, setVideos }}>
      {children}
    </ExploreContext.Provider>
  );
};

export const useExplore = () => {
  const context = useContext(ExploreContext);
  if (!context) {
    throw new Error('useExplore must be used within ExploreProvider');
  }
  return context;
};
