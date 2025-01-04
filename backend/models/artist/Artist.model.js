const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    // Optional fields for better artist information
    birthDate: { type: Date },
    nationality: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Artist', artistSchema);
