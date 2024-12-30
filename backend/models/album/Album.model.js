const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
  releaseDate: { type: Date },
  coverImage: { type: String },
});

module.exports = mongoose.model('Album', albumSchema);
