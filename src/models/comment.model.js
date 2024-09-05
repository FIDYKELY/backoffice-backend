const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Connexion à la base de données

const Comment = sequelize.define('Comment', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products', // nom de la table des produits
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // nom de la table des utilisateurs
      key: 'id',
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false, // Désactive la gestion automatique de createdAt et updatedAt
});

module.exports = Comment;
