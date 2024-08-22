const productRepository = require('../repositories/productRepository');
const { validationResult } = require('express-validator');
const { Sequelize } = require('sequelize');

const createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { product_name, description, price, category_id, reviews, is_favourite, ratings, image_url } = req.body;
        const product = await productRepository.createProduct({
            product_name,
            description,
            price,
            category_id,
            reviews,
            is_favourite,
            ratings,
            image_url
        });
        res.status(201).json(product);
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du produit' });
    }
};

const getAllProducts = async (req, res) => {
    const { page = 1, limit = 10, sort, ...filters } = req.query;
    
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    
    if (isNaN(pageNumber) || pageNumber < 1) {
        return res.status(400).json({ message: 'Page invalide' });
    }
    
    if (isNaN(limitNumber) || limitNumber < 1) {
        return res.status(400).json({ message: 'Limite invalide' });
    }
    
    const options = {
        limit: limitNumber,
        offset: (pageNumber - 1) * limitNumber,
        order: sort ? [[sort.field, sort.order]] : [['createdAt', 'DESC']]
    };
    
    try {
        const products = await productRepository.getAllProducts(filters, options);
        res.json(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des produits' });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productRepository.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du produit' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { product_name, description, price, category_id, reviews, is_favourite, ratings, image_url } = req.body;
        const [updated] = await productRepository.updateProduct(id, {
            product_name,
            description,
            price,
            category_id,
            reviews,
            is_favourite,
            ratings,
            image_url
        });
        if (!updated) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        const updatedProduct = await productRepository.getProductById(id);
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du produit' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await productRepository.deleteProduct(id);
        if (!deletedRows) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du produit' });
    }
};

const searchProducts = async (req, res) => {
    const { query } = req.query;
    try {
        const products = await productRepository.searchProducts(query);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la recherche des produits' });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts
};
