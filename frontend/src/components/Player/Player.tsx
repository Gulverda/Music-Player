import React, { useRef, useState, useEffect } from 'react';
import './Player.css';

interface PlayerProps {
  songUrl: string;
  songTitle: string;
  songArtist: string;
  songImage: string;
  songList: Array<{ url: string; title: string; artist: string; image: string }>;
  currentSongIndex: number;
  onSongChange: (newIndex: number) => void;
}

const Player: React.FC<PlayerProps> = ({
  songUrl,
  songTitle,
  songArtist,
  songImage,
  songList,
  currentSongIndex,
  onSongChange,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Reset currentTime and duration when the song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.oncanplaythrough = () => {
        audioRef.current?.play().catch((err) => console.error('Error playing song:', err));
        setIsPlaying(true);
      };

      // Reset currentTime and duration when the song URL changes
      setCurrentTime(0);
      setDuration(0);
    }
  }, [songUrl]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.error('Error playing song:', err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
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

  const handlePrevious = () => {
    if (audioRef.current) {
      if (currentTime > 5) {
        // If more than 5 seconds played, restart the current song
        audioRef.current.currentTime = 0;
      } else if (currentSongIndex > 0) {
        // If less than 5 seconds, go to the previous song
        onSongChange(currentSongIndex - 1);
      }
    }
  };

  const handleNext = () => {
    if (currentSongIndex < songList.length - 1) {
      onSongChange(currentSongIndex + 1);
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
        <button className="control-btn" onClick={handlePrevious} disabled={currentSongIndex === 0 && currentTime <= 5}>
          ⏮
        </button>
        <button className="play-pause-btn" onClick={togglePlayPause}>
          {isPlaying ? '⏸' : '▶️'}
        </button>
        <button className="control-btn" onClick={handleNext} disabled={currentSongIndex === songList.length - 1}>
          ⏭
        </button>
      </div>
      <audio
        ref={audioRef}
        src={`${process.env.REACT_APP_API_URL}/uploads/${encodeURIComponent(songUrl)}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={(e) => {
          console.error('Audio error occurred:', e.currentTarget.error);
          alert('An error occurred while loading the audio. Please check the console for details.');
        }}
      ></audio>
    </div>
  );
};

export default Player;
