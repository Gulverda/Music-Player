const express = require('express');
const { getAllAlbums, getAlbum, createAlbum } = require('../../controllers/albumController');
const router = express.Router();

router.get('/', getAllAlbums);
router.get('/:id', getAlbum);
router.post('/', createAlbum);

module.exports = router;
