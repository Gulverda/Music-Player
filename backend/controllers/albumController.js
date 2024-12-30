const Album = require('../models/album/Album.model');

// Get all albums
const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate('artist');
    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving albums', error: err });
  }
};

// Get a single album by ID
const getAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist');
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving album', error: err });
  }
};

// Create a new album
const createAlbum = async (req, res) => {
  try {
    const { title, artist, releaseDate, coverImage } = req.body;
    const newAlbum = new Album({
      title,
      artist,
      releaseDate,
      coverImage,
    });
    const savedAlbum = await newAlbum.save();
    res.status(201).json(savedAlbum);
  } catch (err) {
    res.status(500).json({ message: 'Error creating album', error: err });
  }
};

module.exports = { getAllAlbums, getAlbum, createAlbum };
