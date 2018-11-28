const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 8081;
const app = express();
const socketServer = http.createServer(app);
const io = socketIo(socketServer);

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({
    express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'
  });
});

app.get('/', (req, res) => {
  res.send('Haha');
});

let interval;
io.on('connection', socket => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(
    () => socket.emit('Interval Event', 'No message right now'),
    1000
  );
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

socketServer.listen(port, () => console.log(`Listening on port ${port}`));
