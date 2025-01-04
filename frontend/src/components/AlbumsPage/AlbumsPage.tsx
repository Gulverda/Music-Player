import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AlbumsPage.css';

interface Album {
  _id: string;
  title: string;
  coverImage: string;
}

const AlbumsPage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/albums`); 
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data = await response.json();
        setAlbums(data);
      } catch (err) {
        setError('Error fetching albums');
        console.error('Error fetching albums:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return <p className="loading">Loading albums...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="albums-page">
      <h2>Albums</h2>
      <div className="album-container">
        {albums.map((album) => (
          <div key={album._id} className="album-item">
            <Link to={`/album/${album._id}`}>
              <img src={album.coverImage} alt={album.title} />
              <p>{album.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumsPage;
