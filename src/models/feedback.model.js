// const mongoose = require('mongoose');
const { INTEGER } = require("sequelize");
const sequelize = require("../config/database");

const Feedback = sequelize.define("Feedback", {
  star: {
    type: Number,
    required: true,
  },
  rater_id: {
    type: INTEGER,
    required: true,
  },
  user_id: {
    type: INTEGER,
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

// const Feedback = mongoose.model(
//     'Feedback',
//     FeedbackSchema,
//     'feedbacks'
// );

module.exports = { Feedback };
