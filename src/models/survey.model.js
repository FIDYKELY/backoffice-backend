// const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');
const sequelize = require('../config/database');

const Survey = sequelize.define('Survey',{
    id: {
        type: INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true,
    },
    descriptions: {
        type: String,
        required: true,
    },
    user_id: {
        type: INTEGER,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false
    }
},{
    tableName: 'surveys'
});

// const Survey = mongoose.model(
//     'Survey',
//     SurveySchema,
//     'surveys'
// );

module.exports = { Survey };