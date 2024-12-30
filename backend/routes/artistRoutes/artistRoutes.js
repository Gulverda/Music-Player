const express = require('express');
const { getAllArtists, getArtist, createArtist } = require('../../controllers/artistController');
const router = express.Router();

router.get('/', getAllArtists);
router.get('/:id', getArtist);
router.post('/', createArtist);

module.exports = router;
