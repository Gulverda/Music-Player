import React, { createContext, useState } from 'react';

export const MusicContext = createContext(null);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <MusicContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </MusicContext.Provider>
  );
};
