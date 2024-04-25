const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collection = new Schema({
  name: { type: String },
  user:{
    type: mongoose.ObjectId,
    ref: 'users'
  },
  videos:{type: Number}
});

module.exports = mongoose.model('collections', collection);