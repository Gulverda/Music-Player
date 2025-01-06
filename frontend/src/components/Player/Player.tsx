import React, { useRef, useState, useEffect } from 'react';
import './Player.css';

interface PlayerProps {
  songUrl: string;
  songTitle: string;
  songArtist: string;
  songImage: string;
}

const Player: React.FC<PlayerProps> = ({ songUrl, songTitle, songArtist, songImage }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Build the full URL using the environment variable
  const fullSongUrl = `${process.env.REACT_APP_API_URL}/uploads/${encodeURIComponent(songUrl)}`;

  useEffect(() => {
    if (audioRef.current && fullSongUrl) {
      // Pause and load the song before attempting to play it
      audioRef.current.pause();
      audioRef.current.load();

      // Play only if it's ready to play
      audioRef.current.oncanplaythrough = () => {
        audioRef.current?.play().catch((err) => console.error("Error playing song:", err));
        setIsPlaying(true); // Automatically set to play state when song starts
      };
    }
  }, [fullSongUrl]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Wait until it's fully loaded and ready to play
        if (audioRef.current.readyState >= 3) {
          audioRef.current.play().catch((err) => console.error("Error playing song:", err));
        } else {
          // If it's not ready, wait for canplaythrough event
          audioRef.current.oncanplaythrough = () => {
            audioRef.current?.play().catch((err) => console.error("Error playing song:", err));
          };
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (!duration && audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget as HTMLElement;
      const clickPosition = e.nativeEvent.offsetX;
      const newTime = (clickPosition / progressBar.offsetWidth) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="player-container">
      <header>
        <button className="back-btn">←</button>
        <h2>Playing Now</h2>
      </header>
      <div className="image-container">
        <img src={songImage} alt={songTitle} />
      </div>
      <div className="song-details">
        <h3>{songTitle}</h3>
        <p>{songArtist}</p>
      </div>
      <div className="progress-container" onClick={handleProgressClick}>
        <div
          className="progress"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
      </div>
      <div className="time-stamps">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="controls">
        <button className="control-btn">⏮</button>
        <button className="play-pause-btn" onClick={togglePlayPause}>
          {isPlaying ? '⏸' : '▶️'}
        </button>
        <button className="control-btn">⏭</button>
      </div>
      {fullSongUrl && (
        <audio
          ref={audioRef}
          src={fullSongUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onError={(e) => {
            console.error('Audio error occurred:', e.currentTarget.error);
            alert('An error occurred while loading the audio. Please check the console for details.');
          }}
        ></audio>
      )}
    </div>
  );
};

export default Player;
