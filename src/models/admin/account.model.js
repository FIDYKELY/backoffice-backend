// const mongoose = require("mysql");
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const { DEFAULT_AVATAR } = require("../../config/constant");

const Account = sequelize.define('Account',{
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  avatar: {
    type: String,
    required: false,
    default: DEFAULT_AVATAR,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

// AccountSchema.methods.initial = function initial() {
//   return this.fullname.slice(0, 1);
// };

// const Account = mongoose.model("Account", AccountSchema, "accounts");

module.exports = { Account };
