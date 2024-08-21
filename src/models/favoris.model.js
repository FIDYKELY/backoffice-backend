// const mongoose = require("mysql");
const { INTEGER } = require("sequelize");
const sequelize = require("../config/database");

const Favoris = sequelize.define("Favoris", {
  item: {
    type: INTEGER,
    required: true,
  },
  user_id: {
    type: INTEGER,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// const Favoris = mongoose.model("Favoris", FavorisSchema, "favoris");

module.exports = { Favoris };
