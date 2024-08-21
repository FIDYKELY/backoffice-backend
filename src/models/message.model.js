// const mongoose = require('mongoose');
const { INTEGER } = require("sequelize");
const sequelize = require("../config/database");

const Message = sequelize.define("Message", {
  content: {
    type: String,
    required: true,
  },
  sender_id: {
    type: INTEGER,
    required: true,
  },
  receiver_id: {
    type: INTEGER,
    required: true,
  },
  is_seen: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// const Message = mongoose.model(
//     'Message',
//     MessageSchema,
//     'messages'
// );

module.exports = { Message };
