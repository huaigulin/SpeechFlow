'use strict';
const mongoose = require('mongoose');

var connectionSchema = mongoose.Schema({
  socketID: [String],
  username: String
});

module.exports = mongoose.model('connection', connectionSchema);
