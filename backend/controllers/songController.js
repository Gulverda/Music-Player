const Song = require('../models/song/Song.model');

// Get all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate('artist').populate('album');
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving songs', error: err });
  }
};

// Get a single song by ID
const getSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('artist').populate('album');
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(200).json(song);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving song', error: err });
  }
};

// Create a new song
const createSong = async (req, res) => {
  try {
    const { title, artist, album, genre, duration, url } = req.body;
    const newSong = new Song({
      title,
      artist,
      album,
      genre,
      duration,
      url,
    });
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (err) {
    res.status(500).json({ message: 'Error creating song', error: err });
  }
};

module.exports = { getAllSongs, getSong, createSong };
