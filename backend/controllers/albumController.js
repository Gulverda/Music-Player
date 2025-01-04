const Album = require('../models/album/Album.model');
const Song = require('../models/song/Song.model');

// Get all albums
const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find(); // Modify to your logic
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch albums' });
  }
};

// Get a specific album by id
const getAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findById(id); // Modify to your logic
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(album);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch album' });
  }
};

// Get songs for a specific album
const getSongsByAlbum = async (req, res) => {
  const { albumId } = req.params;
  try {
    // Assuming each song has an album reference
    const songs = await Song.find({ album: albumId }); // Modify to your logic
    if (!songs) {
      return res.status(404).json({ message: 'No songs found for this album' });
    }
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch songs' });
  }
};

// Create a new album
const createAlbum = async (req, res) => {
  const { name, coverImage, artist } = req.body; // Assuming these fields are sent in the request body

  try {
    const newAlbum = new Album({
      name,
      coverImage,
      artist,
    });

    await newAlbum.save(); // Save the new album to the database

    res.status(201).json({ message: 'Album created successfully', album: newAlbum });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create album', error: err.message });
  }
};

module.exports = { getAllAlbums, getAlbum, getSongsByAlbum, createAlbum };
