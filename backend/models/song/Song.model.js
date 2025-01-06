const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
    genre: { type: String },
    duration: { type: Number, required: true }, // in seconds
    url: { type: String, required: true },
    trackNumber: { type: Number }, // Optional: Track number in the album
    songImage: { type: String, required: false }, // New image field (optional)
  },
  { timestamps: true }
);

module.exports = mongoose.model('Song', songSchema);
