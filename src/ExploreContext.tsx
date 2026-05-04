import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ExploreContextType {
  isExploreClicked: boolean;
  setIsExploreClicked: (value: boolean) => void;
}

const ExploreContext = createContext<ExploreContextType | undefined>(undefined);

export const ExploreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isExploreClicked, setIsExploreClicked] = useState(false);

  return (
    <ExploreContext.Provider value={{ isExploreClicked, setIsExploreClicked }}>
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
