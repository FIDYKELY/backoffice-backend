const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");
const { INTEGER } = require('sequelize');
const { DEFAULT_AVATAR } = require("../config/constant");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  _id: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true,
    lowercase: true,
  },
  email_verified_at: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  fullname: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  reset_code: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
  verification_code: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  remember_token: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
});


// UserSchema.methods.initial = function initial() {
//     return this.fullname.slice(0, 1);
// };

// const User = mongoose.model("User", UserSchema, "users");

module.exports = { User };
