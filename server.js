const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 8081;
const app = express();
const socketServer = http.createServer(app);
const io = socketIo(socketServer);
const aws = require('aws-sdk');
const fs = require('fs-extra');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

// configure the keys for accessing AWS
aws.config.update({
  accessKeyId: process.env.AWS_KEY, //process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET //process.env.AWS_SECRET
});

// configure AWS to work with promises
aws.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new aws.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET, //process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

// Define POST route for file uploads to aws
app.post('/upload-file', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const filePath = files.file[0].path;
      const buffer = fs.readFileSync(filePath);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const userName = fields.userName[0];
      const fileName = path.parse(files.file[0].originalFilename).name;
      const fileDirectory = `${userName}/${fileName}`;
      const data = await uploadFile(buffer, fileDirectory, type);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'palocal/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/palocal/build/index.html'));
});

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({
    express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'
  });
});

app.get('/', (req, res) => {
  res.send('Haha');
});

// let interval;
io.on('connection', socket => {
  console.log('New client connected');

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('video', () => {
    io.sockets.to(socket.room).emit('video');
  });

  socket.on('pdf', () => {
    io.sockets.to(socket.room).emit('pdf');
  });

  socket.on('play', time => {
    io.sockets.to(socket.room).emit('play', time);
  });

  socket.on('pause', time => {
    io.sockets.to(socket.room).emit('pause', time);
  });

  socket.on('forward', time => {
    io.sockets.to(socket.room).emit('forward', time);
  });

  socket.on('down click', function() {
    console.log('sending down click to: ' + socket.room);
    let rooms = Object.keys(socket.rooms);
    console.log('Current rooms for this socket: ' + rooms);
    io.sockets.to(socket.room).emit('SOMEONE CLICKED THE DOWN BUTTON!!!!');
  });

  socket.on('up click', function() {
    io.sockets.to(socket.room).emit('SOMEONE CLICKED THE UP BUTTON!!!!');
  });

  socket.on('left click', function() {
    io.sockets.to(socket.room).emit('SOMEONE CLICKED THE LEFT BUTTON!!!!');
  });

  socket.on('right click', function() {
    io.sockets.to(socket.room).emit('SOMEONE CLICKED THE RIGHT BUTTON!!!!');
  });

  socket.on('next slide', pageNum => {
    io.sockets.to(socket.room).emit('SOMEONE HIT NEXT', pageNum + 1);
  });

  socket.on('back slide', pageNum => {
    io.sockets.to(socket.room).emit('SOMEONE HIT BACK', pageNum - 1);
  });

  socket.on('login', username => {
    socket.leave(socket.id);
    socket.join(username);
    socket.room = username;
  });

  // Emit a message on an interval
  // if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(
  //   () => socket.emit('Interval Event', 'No message right now'),
  //   1000
  // );
});

//useless db code
// const Connection = require('./palocal/models/connection');
// function createUser(username,socket){
//   let newConnection = new Connection ({
//     socketID: [socket.id],
//     username: username
//   });
//   newConnection
//     .save()
//     .then(() => {
//       console.log('Connection saved')
//     })
// }

// function addUser(username,connections,socket){
//   var newConnections = connections[0].socketID.push(socket.id);
//   Connections.update({ username: username }, { $set: { socketID: newConnections } })
//     .then(console.log('addUser promise complete'))
//     .error(console.log(error));
// }
//
// function login(username, socket) {
//   Connection.find({username: username})
//     .exec()
//     .then(connections => {
//       console.dir(connections)
//       if (connections.length == 0){
//         createUser(username, socket);
//         console.log('created socket connection')
//       } else {
//         addUser(username,connections,socket);
//         console.log('added socket connection')
//       }
//     })
//     .catch(error => {
//       console.log(error.message);
//     });
// }
socketServer.listen(port, () => console.log(`Listening on port ${port}`));
