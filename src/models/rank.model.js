// const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');
const sequelize = require('../config/database');

const Rank = sequelize.define('Rank',{
    
    item: {
        type: String,
        required: true
    },
    parent_id: {
        type: INTEGER,
        required: true,
    },
    rank: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    }
},
{
    tableName: "ranks"
}
);

// const Rank = mongoose.model(
//     'Rank',
//     RankSchema,
//     'ranks'
// );

module.exports = { Rank };