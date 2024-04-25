const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sub = new Schema({
    collection: {
        type: mongoose.ObjectId,
        ref: 'collections'
      },
      children:{
        type: mongoose.ObjectId,
        ref: 'childrens'
      }
});

module.exports = mongoose.model('subs', sub);