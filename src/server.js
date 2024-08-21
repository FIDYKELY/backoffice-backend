require("dotenv").config();
require("./config/database");
const { PORT } = require("./config/constant");
const http = require("./app");
const express = require('express');
const app = express();
const path = require('path');


// app.use('/stockage/images/avatar', express.static('stockage/images/avatar'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
    rejectUnauthorized: true,
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  /**
   * Listen the NEW_MESSAGE event from client
   */
  socket.on("NEW_MESSAGE", (data) => {
    console.log("togn ato ar v l message alef");
    console.log(data);
    io.emit(data.receiver, {
      message: data.message,
      sender_fullname: data.sender_fullname,
    });
  });

  socket.on("NEW_NOTIF", (data) => {
    console.log("togn ato ar v l notif alef");
    console.log(data);
    io.emit(data.receiver, {
      itemId: data.itemId,
      ressource: data.ressource,
      receiver: data.receiver,
    });
  });
});

const server = http.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listen on port ${server.address().port}`);
});
