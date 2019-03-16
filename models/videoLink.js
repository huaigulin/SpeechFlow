'use strict';
const mongoose = require('mongoose');

var videoLinkSchema = mongoose.Schema({
  userName: String,
  linkIDs: [String]
});

module.exports = mongoose.model('videoLink', videoLinkSchema);
