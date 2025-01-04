import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Player from './components/Player/Player.tsx';
import AlbumsPage from './components/AlbumsPage/AlbumsPage.tsx';
import Playlist from './components/Playlist/Playlist.tsx';

const App: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<{ url: string; title: string }>({
    url: '',
    title: '',
  });

  const handleSongSelect = (songUrl: string, songTitle: string) => {
    setCurrentSong({ url: songUrl, title: songTitle });
  };

  return (
    <Router>
      <div>
        <h1>Music Player</h1>
        
        {/* Player Component */}
        <Player songUrl={currentSong.url} songTitle={currentSong.title} />

        {/* Routes */}
        <Routes>
          <Route path="/albums" element={<AlbumsPage />} />
          <Route
            path="/album/:albumId"
            element={<Playlist onSongSelect={handleSongSelect} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
