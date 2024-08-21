// const mongoose = require('mongoose');
const { INTEGER } = require("sequelize");
const sequelize = require("../config/database");

const Contact = sequelize.define("Contact", {
  user_id: {
    type: INTEGER,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// const Contact = mongoose.model(
//     'Contact',
//     ContactSchema,
//     'contacts'
// );

module.exports = { Contact };
