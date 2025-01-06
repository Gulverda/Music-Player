import React, { createContext, useState } from 'react';

interface MusicContextType {
  currentSong: any;
  setCurrentSong: React.Dispatch<React.SetStateAction<any>>;
}

export const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <MusicContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </MusicContext.Provider>
  );
};
