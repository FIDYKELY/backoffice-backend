const { Op } = require('sequelize');
const Product = require('../models/product');
const Category = require('../models/category');

class ProductRepository {
    async createProduct(productData) {
        try {
            // Make sure productData includes image_url if provided
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
        try {
            return await Product.update(updatedData, { where: { id } });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit :', error);
            throw error;
        }
    }
    

    async updateProductRating(id, rating) {
        try {
            // Mettre à jour uniquement la note du produit
            await Product.update({ ratings: rating }, { where: { id } });
            // Récupérer le produit mis à jour pour retourner les données actualisées
            return await Product.findByPk(id);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la note du produit :', error);
            throw error;
        }
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
