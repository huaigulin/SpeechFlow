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
const mongoose = require('mongoose');

// configure the keys for accessing AWS
aws.config.update({
  accessKeyId: 'AKIAIBVB7KVFQQJBUA6A', //process.env.AWS_KEY,
  secretAccessKey: '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' //process.env.AWS_SECRET
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
    Bucket: 'speechflow', //process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

// Define POST route for file uploads to aws s3
app.post('/upload-file', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      var data = null;
      for (var i = 0; i < files.files.length; i++) {
        const filePath = files.files[i].path;
        const buffer = fs.readFileSync(filePath);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const userName = fields.userName[0];
        const fileName = path.parse(files.files[i].originalFilename).name;
        const fileDirectory = `${userName}/${fileName}`;
        data = await uploadFile(buffer, fileDirectory, type);
      }
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

const atlas_url =
  'mongodb+srv://' +
  'speechflowdev' + //process.env.ATLAS_USERNAME
  ':' +
  'T3zDyaYaNv78hGX' + //process.env.ATLAS_PASSWORD
  '@cluster0-mdfix.mongodb.net/test?retryWrites=true';

// Connect to Mongo Atlas
mongoose.connect(atlas_url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!');
});

// Define POST route for video link uploads to Mongo Atlas
const VideoLinkModel = require('./models/videoLink');
app.post('/upload-video-link', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields) => {
    if (error) throw new Error(error);

    VideoLinkModel.find({
      userName: fields.userName[0]
    })
      .exec()
      .then(databaseEntry => {
        var link = fields.link[0];
        var regEx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        var match = link.match(regEx);
        var id = '';
        if (match && match[1].length == 11) {
          id = match[1];
        }
        if (databaseEntry.length == 0) {
          var linkIDArray = [id];
          let newVideoLinkModel = new VideoLinkModel({
            userName: fields.userName[0],
            linkIDs: linkIDArray
          });
          newVideoLinkModel.save().catch(error => {
            console.log(
              'ERROR in upload-video-link post request save(): ' + error
            );
          });
        } else {
          var linkIDArray = databaseEntry[0].linkIDs;
          if (!linkIDArray.includes(id)) {
            linkIDArray.push(id);
            VideoLinkModel.updateMany(
              { userName: fields.userName[0] },
              { $set: { linkIDs: linkIDArray } }
            ).catch(error => {
              console.log(
                'ERROR in upload-video-link post request update(): ' + error
              );
            });
          }
        }
        response.status(200).send('success');
      });
  });
});

// POST request to upload a flow
const FlowModel = require('./models/flow');
app.post('/upload-flow', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields) => {
    if (error) throw new Error(error);

    var pdfAndImages = fields.pdfAndImages;
    var pdfs = [];
    var images = [];
    for (var i = 0; i < pdfAndImages.length; i++) {
      if (pdfAndImages[i].substr(pdfAndImages[i].length - 3) === 'pdf') {
        pdfs.push(pdfAndImages[i]);
      } else {
        images.push(pdfAndImages[i]);
      }
    }

    FlowModel.find({
      userName: fields.userName[0]
    })
      .exec()
      .then(databaseEntry => {
        if (databaseEntry.length == 0) {
          let newFlowModel = new FlowModel({
            userName: fields.userName[0],
            flows: [
              {
                id: 0,
                flowName: 'New Flow',
                pdfs: pdfs,
                images: images,
                videos: fields.videos
              }
            ]
          });
          newFlowModel
            .save()
            .then(() => {
              if (fields.videos == null) {
                console.log(fields.videos);
                response.send({ pdf: pdfs[0], video: '9j7ANRXsCwc' }); // TO CHANGE
              } else {
                console.log(fields.videos);
                response.send({ pdf: pdfs[0], video: fields.videos });
                //response.send({ pdf: pdfs[0], video: fields.videos[0] }); // TO CHANGE
              }
            })
            .catch(error => {
              console.log('ERROR in upload-flow post request save(): ' + error);
            });
        } else {
          var flowsArray = databaseEntry[0].flows;
          flowsArray.push({
            id: flowsArray.length,
            flowName: 'New Flow',
            pdfs: pdfs,
            images: images,
            videos: fields.videos
          });
          FlowModel.updateMany(
            { userName: fields.userName[0] },
            { $set: { flows: flowsArray } }
          )
            .then(() => {
              if (fields.videos == null) {
                //response.send({ pdf: pdfs[0], video: '9j7ANRXsCwc' }); // TO CHANGE
                response.send({ pdf: pdfs[0], video: [] });
              } else {
                response.send({ pdf: pdfs[0], video: fields.videos });
                //response.send({ pdf: pdfs[0], video: fields.videos[0] }); // TO CHANGE
              }
            })
            .catch(error => {
              console.log(
                'ERROR in upload-flow post request update(): ' + error
              );
            });
        }
      });
  });
});

// Get Thumbnails from mongodb
app.post('/getThumbnails', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields) => {
    if (error) throw new Error(error);

    VideoLinkModel.find({
      userName: fields.userName[0]
    })
      .exec()
      .then(databaseEntry => {
        var linkIDArray = databaseEntry[0].linkIDs;
        response.send(linkIDArray);
      });
  });
});

// Delete links on mongodb
app.post('/deleteThumbnails', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields) => {
    if (error) throw new Error(error);

    VideoLinkModel.find({
      userName: fields.userName[0]
    })
      .exec()
      .then(databaseEntry => {
        var linkIDArray = databaseEntry[0].linkIDs;
        var newLinkIDArray = [];
        for (var i = 0; i < linkIDArray.length; i++) {
          var id = linkIDArray[i];
          var toDelete = false;
          for (var j = 0; j < fields.IDs.length; j++) {
            if (fields.IDs[j] === id) {
              toDelete = true;
            }
          }
          if (toDelete === false) {
            newLinkIDArray.push(id);
          }
        }
        VideoLinkModel.updateMany(
          { userName: fields.userName[0] },
          { $set: { linkIDs: newLinkIDArray } }
        ).catch(error => {
          console.log(
            'ERROR in deleteThumbnails post request update(): ' + error
          );
        });
        response.send('success');
      });
  });
});

// Get flows from mongodb
app.post('/getFlows', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields) => {
    if (error) throw new Error(error);

    FlowModel.find({
      userName: fields.userName[0]
    })
      .exec()
      .then(databaseEntry => {
        if (databaseEntry.length == 0) {
          response.send('No flow yet');
        } else {
          var flowArray = databaseEntry[0].flows;
          response.send(flowArray);
        }
      });
  });
});

// Change the title of a flow in mongodb
app.post('/changeFlowTitle', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields) => {
    if (error) throw new Error(error);

    var flowId = fields.flowId[0];
    flowId = flowId.substr(-1);
    flowId = parseInt(flowId);

    FlowModel.find({
      userName: fields.userName[0]
    })
      .exec()
      .then(databaseEntry => {
        var flowArray = databaseEntry[0].flows;
        flowArray[flowId].flowName = fields.flowTitle[0];
        FlowModel.updateMany(
          { userName: fields.userName[0] },
          { $set: { flows: flowArray } }
        ).catch(error => {
          console.log(
            'ERROR in changeFlowTitle post request update(): ' + error
          );
        });
        response.send('success');
      });
  });
});

// Delete a flow in mongodb
app.post('/deleteFlow', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields) => {
    if (error) throw new Error(error);

    var flowId = fields.flowId[0];
    flowId = flowId.substr(-1);
    flowId = parseInt(flowId);

    FlowModel.find({
      userName: fields.userName[0]
    })
      .exec()
      .then(databaseEntry => {
        var flowArray = databaseEntry[0].flows;
        flowArray.splice(flowId, 1);
        for (var i = 0; i < flowArray.length; i++) {
          flowArray[i].id = i;
        }
        FlowModel.updateMany(
          { userName: fields.userName[0] },
          { $set: { flows: flowArray } }
        ).catch(error => {
          console.log('ERROR in deleteFlow post request update(): ' + error);
        });
        response.send('success');
      });
  });
});

// Change the order of flows and cards in mongodb
app.post('/changeFlowOrder', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields) => {
    if (error) throw new Error(error);

    var newState = fields.newState[0];
    newState = JSON.parse(newState);
    const flowOrder = newState.flowOrder;

    var flowArray = [];
    for (var i = 0; i < flowOrder.length; i++) {
      const mainFlow = newState.flows[flowOrder[i]];
      const videoFlow = newState.flows[flowOrder[i] + '-1'];
      const imageFlow = newState.flows[flowOrder[i] + '-2'];

      const pdfCardIds = mainFlow.cardIds;
      var pdfs = [];
      for (var j = 0; j < pdfCardIds.length; j++) {
        const pdf = newState.cards[pdfCardIds[j]].content;
        pdfs.push(pdf);
      }

      const videoCardIds = videoFlow.cardIds;
      var videos = [];
      for (var k = 0; k < videoCardIds.length; k++) {
        const video = newState.cards[videoCardIds[k]].content;
        videos.push(video);
      }

      const imageCardIds = imageFlow.cardIds;
      var images = [];
      for (var l = 0; l < imageCardIds.length; l++) {
        const image = newState.cards[imageCardIds[l]].content;
        images.push(image);
      }

      var flow = {
        id: i,
        flowName: mainFlow.title,
        pdfs: pdfs,
        images: images,
        videos: videos
      };
      flowArray.push(flow);
    }

    FlowModel.updateMany(
      { userName: fields.userName[0] },
      { $set: { flows: flowArray } }
    )
      .then(() => {
        response.send('success');
      })
      .catch(error => {
        console.log('ERROR in changeFlowOrder post request update(): ' + error);
      });
  });
});

// Delete a card in mongodb
app.post('/deleteCard', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields) => {
    if (error) throw new Error(error);

    const userName = fields.userName[0];
    const flowIndex = fields.flowIndex[0];
    const cardIndex = fields.cardIndex[0];
    const cardType = fields.cardType[0];

    FlowModel.find({
      userName: userName
    })
      .exec()
      .then(databaseEntry => {
        var flowArray = databaseEntry[0].flows;
        switch (cardType) {
          case 'pdf':
            flowArray[flowIndex].pdfs.splice(cardIndex, 1);
            break;
          case 'video':
            flowArray[flowIndex].videos.splice(cardIndex, 1);
            break;
          case 'image':
            flowArray[flowIndex].images.splice(cardIndex, 1);
            break;
          default:
            console.log('card type error in delete card');
        }
        FlowModel.updateMany(
          { userName: userName },
          { $set: { flows: flowArray } }
        ).catch(error => {
          console.log('ERROR in deleteFlow post request update(): ' + error);
        });
        response.send('success');
      });
  });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'palocal/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/palocal/build/index.html'));
});

app.get('/', (req, res) => {
  res.send('Haha');
});

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

  socket.on('gallery', () => {
    io.sockets.to(socket.room).emit('gallery');
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

  socket.on('next slide', (docName, pageNum) => {
    io.sockets.to(socket.room).emit('SOMEONE HIT NEXT', pageNum + 1);
  });

  socket.on('back slide', (docName, pageNum) => {
    io.sockets.to(socket.room).emit('SOMEONE HIT BACK', pageNum - 1);
  });

  socket.on('what is doc name and page num?', () => {
    io.sockets.to(socket.room).emit('do you have doc name and page num?');
  });

  socket.on('what is video link?', () => {
    io.sockets.to(socket.room).emit('do you have video link?');
  });

  socket.on('yes i have them', (docName, pageNum) => {
    io.sockets
      .to(socket.room)
      .emit('update doc name and page num', docName, pageNum);
  });

  socket.on('yes i have video link', videoLink => {
    io.sockets.to(socket.room).emit('update video link', videoLink);
  });

  socket.on('login', username => {
    socket.leave(socket.id);
    socket.join(username);
    socket.room = username;
  });
});

socketServer.listen(port, () => console.log(`Listening on port ${port}`));
