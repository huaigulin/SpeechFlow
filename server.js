const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 8081;
const app = express();
const socketServer = http.createServer(app);
const io = socketIo(socketServer);
const redis = require('redis');
//const redisClient = redis.createClient();

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

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('down click', function(){
    io.emit('SOMEONE CLICKED THE DOWN BUTTON!!!!')
  })

  socket.on('up click', function(){
    io.emit('SOMEONE CLICKED THE UP BUTTON!!!!')
  })

  socket.on('left click', function(){
    io.emit('SOMEONE CLICKED THE LEFT BUTTON!!!!')
  })

  socket.on('right click', function(){
    io.emit('SOMEONE CLICKED THE RIGHT BUTTON!!!!')
  })

  socket.on('next slide', pageNum => {
    io.emit('SOMEONE HIT NEXT', pageNum);
  })

  socket.on('back slide', pageNum => {
    io.emit('SOMEONE HIT BACK', pageNum);
  })

  // Emit a message on an interval
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(
    () => socket.emit('Interval Event', 'No message right now'),
    1000
  );



  // Save the socket id to Redis so that all processes can access it by asking for user name.

  socket.on('User Name', function(userName) {
    var socketIDs = null;
    redisClient.get(userName, function(err, values) {
      if (err) throw err;
      socketIDs = values;
    });

    redisClient.set(userName, socket.id, function(err) {
      if (err) throw err;
      console.log(
        'The user is: <' + userName + '>, ' + 'this dumb ass has socket ids: '
      );
    });
  });
});


socketServer.listen(port, () => console.log(`Listening on port ${port}`));
