const { Op } = require('sequelize');
const Product = require('../models/product');
const Category = require('../models/category');

class ProductRepository {
    async createProduct(productData) {
        try {
            return await Product.create(productData);
        } catch (error) {
            console.error('Erreur lors de la création du produit :', error);
            throw error;
        }
    }

    async getAllProducts(filters = {}, options = {}) {
        return await Product.findAll({ where: filters, ...options });
    }

    async getProductById(id) {
        return await Product.findByPk(id);
    }

    async updateProduct(id, updatedData) {
        return await Product.update(updatedData, { where: { id } });
    }

    async deleteProduct(id) {
        try {
            const deletedRows = await Product.destroy({ where: { id } });
            return deletedRows;
        } catch (error) {
            console.error('Erreur lors de la suppression du produit :', error);
            throw error;
        }
    }

    async searchProducts(query) {
        try {
            return await Product.findAll({
                where: {
                    [Op.or]: [
                        { product_name: { [Op.like]: `%${query}%` } },
                        { description: { [Op.like]: `%${query}%` } }
                    ]
                }
            });
        } catch (error) {
            console.error('Erreur lors de la recherche des produits :', error);
            throw error;
        }
    }
}

module.exports = new ProductRepository();
