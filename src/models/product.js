const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: 'Categories',
            key: 'id'
        }
    },
    reviews: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    is_favourite: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    ratings: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: true,
        defaultValue: 0.0
    },
    image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    }
}, {
    timestamps: true
});

Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product;
