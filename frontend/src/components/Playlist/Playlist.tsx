import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Playlist.css';
import { Song } from '../../App.tsx'; // Import Song type from App.tsx

interface PlaylistProps {
  onSongSelect: (song: Song) => void;
}

const Playlist: React.FC<PlaylistProps> = ({ onSongSelect }) => {
  const { albumId } = useParams<{ albumId: string }>(); // Get albumId from URL
  const [songs, setSongs] = useState<Song[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/albums/${albumId}/songs`);
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        const data = await response.json();
        setSongs(data);
      } catch (err) {
        console.error('Error fetching songs:', err);
      }
    };

    if (albumId) {
      fetchSongs();
    }
  }, [albumId]);

  return (
    <div className="playlist-container">
      <button className="back-button" onClick={() => navigate('/albums')}>
        Back to Albums
      </button>
      <h2>Playlist</h2>
      <ul>
        {songs.map((song) => (
          <li key={`${song.id}-${song.title}`}> {/* Ensuring uniqueness */}
            <button onClick={() => onSongSelect(song)}>
              {song.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
