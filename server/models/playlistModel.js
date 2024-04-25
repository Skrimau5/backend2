const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlist = new Schema({
  name: { type: String },
  url: { type: String },
  collection: {
    type: mongoose.ObjectId,
    ref: 'collections'
  }
});

module.exports = mongoose.model('playlists', playlist);