// requiring express and creating app express server
const express = require('express');
const app = express();
// creating http server based on express app
const server = require('http').createServer(app);
//requiring socket.io Server
const { Server } = require('socket.io');


// setting up static files
app.use(express.static(__dirname + '/public'));
// setting up port
const port = process.env.PORT || 3000;
// setting up socket.io server, and cors service

const io = Server(server, {
    cors: {
        origin: `http://localhost:${port}`,
    },
});
// io.directory = {};

// requiring handlers
const messageHandler = require('./handlers/messageHandler');

// io.use((socket, next) => {
//     let user = socket.handshake.query.username;
//     if (user) {
//         return next();
//     }
//     return next(new Error('authentication error'));
// });

const onDisconnect = (socket) => {
    // delete io.directory[socket.handshake.query.username];
    console.log('user disconnected');
};

const onConnection = (socket) => {
    console.log('user connected');

    // io.directory[socket.handshake.query.username] = socket.id;
    socket.on('disconnect', onDisconnect);
    messageHandler(io, socket);
};

// setting up socket events
io.on('connection', onConnection);

// setting up app server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});