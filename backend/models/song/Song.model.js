const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  genre: { type: String },
  duration: { type: Number, required: true }, // in seconds
  url: { type: String, required: true },
});

module.exports = mongoose.model('Song', songSchema);
