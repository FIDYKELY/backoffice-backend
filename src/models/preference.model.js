// const mongoose = require('mongoose');
const { INTEGER } = require("sequelize");
const sequelize = require("../config/database");

const Preference = sequelize.define("Preference",{
    param: {
        type: String,
        required: true,
    },
    user_id: {
        type: INTEGER,
        required: true,
    },
    value: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    }
},
{
    tableName: "preference"
}
);

// const Preference = mongoose.model(
//     'Preference',
//     PreferenceSchema,
//     'preferences'
// );

module.exports = { Preference } ;