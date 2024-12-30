const Artist = require('../models/artist/Artist.model');

// Get all artists
const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving artists', error: err });
  }
};

// Get a single artist by ID
const getArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving artist', error: err });
  }
};

// Create a new artist
const createArtist = async (req, res) => {
  try {
    const { name, bio, image } = req.body;
    const newArtist = new Artist({ name, bio, image });
    const savedArtist = await newArtist.save();
    res.status(201).json(savedArtist);
  } catch (err) {
    res.status(500).json({ message: 'Error creating artist', error: err });
  }
};

module.exports = { getAllArtists, getArtist, createArtist };
