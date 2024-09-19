const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assure-toi de la bonne configuration de ta connexion Sequelize

const Favourite = sequelize.define('Favourite', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nom de la table des utilisateurs
      key: 'id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products', // Nom de la table des produits
      key: 'id'
    }
  },
  is_favourite: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'user_favourites', // Ici on spécifie le nom correct de la table
  timestamps: true // Si tu utilises `createdAt` et `updatedAt`
});

module.exports = Favourite;
