// const { DataTypes } = require('sequelize');
const { INTEGER } = require('sequelize');
const sequelize = require('../config/database');

const Permission = sequelize.define('Permission', {
   id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
   },
   name: {
      type: String,
      allowNull: false,
   },
   createdAt: {
     type: Date,
     default: Date.now,
   },
   updatedAt: {
     type: Date,
     required: false,
   },
   // Ajoutez ici d'autres champs si nécessaire, en suivant la même structure
  }, {
     tableName: 'permission',
   // Vous pouvez ajouter des options de modèle ici, par exemple pour définir des clés étrangères
  });

module.exports = Permission;