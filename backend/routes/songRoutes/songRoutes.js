const express = require('express');
const { getAllSongs, getSong, createSong } = require('../../controllers/songController');
const router = express.Router();

router.get('/', getAllSongs);
router.get('/:id', getSong);
router.post('/', createSong);

module.exports = router;
