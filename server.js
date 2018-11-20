const express = require('express');
const app = express();
const socketServer = require('http').Server(app);
const io = require('socket.io')(socketServer);

// create a GET route
var msg = '';
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT', msg: msg });
});

app.post('/pdfCommands', function(req, res) {
  msg = req.body.msg;
});

app.post('');

io.on('connection', function(socket) {});

module.exports = app;
