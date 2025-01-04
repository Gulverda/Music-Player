// albumRoutes.js
const express = require('express');
const { getAllAlbums, getAlbum, getSongsByAlbum, createAlbum } = require('../../controllers/albumController');
const router = express.Router();

// Get all albums
router.get('/', getAllAlbums);

// Get a specific album
router.get('/:id', getAlbum);

// Get songs for a specific album
router.get('/:albumId/songs', getSongsByAlbum);  // <-- New route for songs

// Create a new album
router.post('/', createAlbum);

module.exports = router;
