const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    releaseDate: { type: Date },
    coverImage: { type: String },
    // Optional: You can add a `songs` array to store song references directly in the album.
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Album', albumSchema);
