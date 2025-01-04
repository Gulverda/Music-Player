const Artist = require('../models/artist/Artist.model');

// Get all artists
const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
};

// Get a specific artist by ID
const getArtist = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch artist' });
  }
};

// Create a new artist
const createArtist = async (req, res) => {
  const { name, genre, bio } = req.body;
  try {
    const newArtist = new Artist({ name, genre, bio });
    await newArtist.save();
    res.status(201).json(newArtist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create artist' });
  }
};

module.exports = {
  getAllArtists,
  getArtist,
  createArtist,
};
