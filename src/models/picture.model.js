// const mongoose = require('mongoose');
const { INTEGER } = require("sequelize");
const sequelize = require("../config/database");

const Picture = sequelize.define("Picture",{
    _id: {
        type: INTEGER,
        required: true,
    },
    picture: {
        type: String,
        required: true
    },
    post_id: {
        type: INTEGER,
        required: true
    },
    user_id: {
        type: INTEGER,
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
},
{
    tableName: "pictures"
});

// const Picture = mongoose.model(
//     'Picture',
//     PictureSchema,
//     'pictures'
// );

module.exports = { Picture };