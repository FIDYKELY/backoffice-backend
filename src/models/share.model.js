// const mongoose = require("mysql");
const { INTEGER } = require('sequelize');
const sequelize = require('../config/database');

const Share = sequelize.define('Share',{
  item: {
    type: INTEGER,
    required: true,
  },
  publisher_id: {
    type: INTEGER,
    required: true,
  },
  owner_id: {
    type: INTEGER,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// const Share = mongoose.model("Share", ShareSchema, "shares");

module.exports = { Share };
