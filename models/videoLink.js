'use strict';
const mongoose = require('mongoose');

var videoLinkSchema = mongoose.Schema({
  userName: String,
  links: [String]
});

module.exports = mongoose.model('videoLink', videoLinkSchema);
