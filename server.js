'use strict';

const express = require('express');
const socketIO = require('socket.io');
// requiring database
const databaseConnection = require('./databaseConnection');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);
io.directory = {};

//importing messageHandler
const messageHandler = require('./handlers/messageHandler');

const requestForUserIdOnHandshake = async(socket) => {
  let userId = parseInt(socket.handshake.query.userId);
  console.log('manejando ID', typeof userId, userId);
  if (userId != -1) {
    console.log('userId', userId);
    socket.userId = userId;
    io.directory[userId] = socket;
  }else{
    console.log('userId no encontrado');
    // creating new user and set estado as Inactivo
    databaseConnection.query('INSERT INTO Usuario (estado) VALUES (?)', ['Inactivo'], (err, result) => {
      console.log('result', result);
      if (err) {
        console.log('error', err);
      }else{
        userId = result.insertId;
        socket.userId = userId;
        io.directory[userId] = socket;
        socket.emit('userId', userId);
        console.log('userId', userId);
      }
    });
  }
};

io.on('connection', async (socket) => {
  console.log('Client connected');

  await requestForUserIdOnHandshake(socket);
  

  socket.on('disconnect', () => {
    console.log('Client disconnected')
    delete io.directory[socket.userId];
  });

  messageHandler(io, socket)
});
