// const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');
const sequelize = require('../config/database');

const Career = sequelize.define('Career',{
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date || String,
        required: false,
        default: ""
    },
    user_id: {
        type: INTEGER,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    descriptions: {
        type: String,
        required: false
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

// const Career = mongoose.model(
//     'Career',
//     CareerSchema,
//     'careers'
// );

module.exports = { Career };
