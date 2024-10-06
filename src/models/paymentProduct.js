const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PaymentProduct = sequelize.define('PaymentProduct', {
  payment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Payments', // Assurez-vous que le nom du modèle est correct
      key: 'id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products', // Assurez-vous que le nom du modèle est correct
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  modelName: 'PaymentProduct',
  tableName: 'payment_products',
  timestamps: true, // Ceci ajoute les champs createdAt et updatedAt automatiquement
});

module.exports = PaymentProduct;
