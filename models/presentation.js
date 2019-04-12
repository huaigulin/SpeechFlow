'use strict';
const mongoose = require('mongoose');

var presentationSchema = mongoose.Schema({
  userName: String,
  docName: String,
  pageNum: { type: Number, min: 0 },
  pdfList: [String],
  video: String,
  videoList: [String],
  image: String,
  imageList: [String],
  currentMedia: String
});

module.exports = mongoose.model('presentation', presentationSchema);
