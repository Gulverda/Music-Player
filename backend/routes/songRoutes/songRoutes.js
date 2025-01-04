const express = require('express');
const {
  getAllSongs,
  getSong,
  createSong,
  updateSongFile,
} = require('../../controllers/songController');
const upload = require('../../middleware/upload');

const router = express.Router();

router.get('/', getAllSongs); // Fetch all songs
router.get('/:id', getSong);  // Fetch a song by ID
router.post('/', upload.single('mp3'), createSong); // Create a song with MP3 upload
router.put('/:id', upload.single('mp3'), updateSongFile); // Update MP3 file for a song

module.exports = router;
