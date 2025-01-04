const Song = require('../models/song/Song.model');

// Get all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
};

// Get a specific song by ID
const getSong = async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch song' });
  }
};

// Create a new song
const createSong = async (req, res) => {
  const { title, artist, duration } = req.body;

  try {
    const filePath = req.file.path; // Path of the uploaded MP3 file

    const newSong = new Song({
      title,
      artist,
      duration,
      url: filePath, // Save file path as URL
    });

    await newSong.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create song' });
  }
};

// Update an MP3 file for a song
const updateSongFile = async (req, res) => {
  const { id } = req.params;

  try {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    // Update file path
    song.url = req.file.path;
    await song.save();

    res.json({ message: 'Song file updated', song });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update song file' });
  }
};

module.exports = {
  getAllSongs,
  getSong,
  createSong,
  updateSongFile,
};
