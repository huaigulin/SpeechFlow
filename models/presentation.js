'use strict';
const mongoose = require('mongoose');

var presentationSchema = mongoose.Schema({
  userName: String,
  docName: String,
  pageNum: { type: Number, min: 1 },
  pdfsList: [String],
  videoID: String,
  videosList: [String],
  currentImage: String,
  imagesList: [String],
  currentMedia: String
});

module.exports = mongoose.model('presentation', presentationSchema);
