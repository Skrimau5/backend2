const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlist = new Schema({
  name: { type: String },
  url: { type: String },
  user: {type: String}
});

module.exports = mongoose.model('playlists', playlist);