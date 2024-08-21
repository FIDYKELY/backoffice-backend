const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Role } = require('./Role');
const Permission = require('./Permission');

const RolePermission = sequelize.define('RolePermission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true 
  },
  roleId: {
     type: DataTypes.INTEGER,
     field: 'role_id', 
     references: {
       model: Role,
       key: 'id'
     }
  },
  permissionId: {
     type: DataTypes.INTEGER,
     field: 'permission_id', 
     references: {
       model: Permission,
       key: 'id'
     }
  },
 createdAt: {
  type: Date,
  default: Date.now,
},
updatedAt: {
  type: Date,
  required: false,
},
}, {
  tableName: 'rolepermission',
});

RolePermission.belongsTo(Role, { foreignKey: 'role_id' });
RolePermission.belongsTo(Permission, { foreignKey: 'permission_id' });

module.exports = RolePermission;