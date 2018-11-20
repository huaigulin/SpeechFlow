const express = require('express');
const app = express();
const socketServer = require('http').Server(app);
const io = require('socket.io')(socketServer);

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({
    express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT',
    msg: req.body.msg
  });
});

app.post('/pdfCommands', function(req, res) {
  console.log(req.body.msg);
});

app.post('');

io.on('connection', function(socket) {});

module.exports = app;
