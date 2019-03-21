'use strict';
const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  userName: String,
  flows: [
    {
      id: Number,
      flowName: String,
      pdfs: [String],
      images: [String],
      videos: [String]
    }
  ]
});

module.exports = mongoose.model('flow', userSchema);
