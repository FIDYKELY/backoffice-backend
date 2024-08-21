// const mongoose = require('mongoose');
const { INTEGER } = require("sequelize");
const sequelize = require("../config/database");

const Poll = sequelize.define("Poll",{
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
},
{
    tableName: "polls"
}
);

// const Poll = mongoose.model(
//     'Poll',
//     PollSchema,
//     'polls'
// );

module.exports = { Poll };