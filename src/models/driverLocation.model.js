const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Driver = require('./driver.model');


const DriverLocation = sequelize.define('DriverLocation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'drivers', // Nom de la table des conducteurs
      key: 'id'
    }
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.fn('CURRENT_TIMESTAMP'),
    onUpdate: sequelize.fn('CURRENT_TIMESTAMP')
  }
}, {
  sequelize,
  modelName: 'DriverLocation',
  tableName: 'driver_locations',
});

// Association avec le modèle Driver
DriverLocation.belongsTo(Driver, { foreignKey: 'driver_id' });

module.exports = DriverLocation;