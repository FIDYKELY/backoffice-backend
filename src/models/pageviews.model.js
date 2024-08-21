// const mongoose = require('mongoose');
const { INTEGER } = require("sequelize");
const sequelize = require("../config/database");

const Pageviews = sequelize.define("Pageviews", {
    page_name: {
        type: String,
        allowNull: false
    },
    count_view: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: false
    }
});

module.exports = { Pageviews };
