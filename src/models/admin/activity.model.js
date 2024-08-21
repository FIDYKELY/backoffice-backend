// const mongoose = require("mysql");
const { INTEGER } = require('sequelize');
const sequelize = require('../../config/database');

const Activity = sequelize.define('Activity',{
  item: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// const Activity = mongoose.model("Activity", ActivitySchema, "activities");

module.exports = { Activity };
