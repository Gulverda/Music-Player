const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
});

module.exports = mongoose.model('Artist', artistSchema);
