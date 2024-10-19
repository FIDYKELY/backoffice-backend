const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Delivery = sequelize.define('Delivery', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  delivery_status: { // Renommez status en delivery_status
    type: DataTypes.STRING(50), // Définir la longueur si nécessaire
    defaultValue: 'in_transit', // Modifiez la valeur par défaut si nécessaire
    allowNull: false
  },
  assigned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  delivered_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: false
});

module.exports = Delivery;
