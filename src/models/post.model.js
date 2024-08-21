// const mongoose = require('mongoose');
const { INTEGER } = require("sequelize");
const sequelize = require("../config/database");

const Post = sequelize.define("Post",{
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
    tableName: "posts"
}
);

// const Post = mongoose.model(
//     'Post',
//     PostSchema,
//     'posts'
// );

module.exports = { Post };