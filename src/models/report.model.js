// const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');
const sequelize = require('../config/database');

const Report = sequelize.define('Report',{
    reporter_id: {
        type: INTEGER,
        required: true
    },
    item_id: {
        type: INTEGER,
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false
    }
});

// const Report = mongoose.model(
//     'Report',
//     ReportSchema,
//     'reports'
// );

module.exports = { Report };