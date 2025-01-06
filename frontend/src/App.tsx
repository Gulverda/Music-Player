import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Player from './components/Player/Player.tsx';
import AlbumsPage from './components/AlbumsPage/AlbumsPage.tsx';
import Playlist from './components/Playlist/Playlist.tsx';

export interface Song {
  id: any;
  url: string;
  title: string;
  artist: string;
  songImage: string;
}

const App: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<Song>({
    id: null,
    url: '',
    title: 'No Song Selected',
    artist: 'Unknown Artist',
    songImage: 'default-image-url',
  });

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song); // Set the selected song
  };

  return (
    <Router>
      <div>
        <h1>Music Player</h1>

        {/* Render Player component only if currentSong has a valid URL */}
        {currentSong.url && (
          <Player
            songUrl={currentSong.url}
            songTitle={currentSong.title}
            songArtist={currentSong.artist}
            songImage={currentSong.songImage} songList={[]} currentSongIndex={0} onSongChange={function (newIndex: number): void {
              throw new Error('Function not implemented.');
            } }          />
        )}
        {/* Routes for Albums and Playlist */}
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
