import React, { useRef, useEffect } from 'react';
import './Player.css';

interface PlayerProps {
  songUrl: string;
  songTitle: string;
}

const Player: React.FC<PlayerProps> = ({ songUrl, songTitle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [songUrl]);

  if (!songUrl) {
    return <div className="no-song-selected">No song selected</div>;
  }

  // Only encode the song URL once
  const fullSongUrl = `${process.env.REACT_APP_API_URL}/uploads/${encodeURIComponent(songUrl)}`;

  return (
    <div className="player-container">
      <h3>Now Playing: {songTitle}</h3>
      <audio ref={audioRef} controls autoPlay src={fullSongUrl}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Player;
