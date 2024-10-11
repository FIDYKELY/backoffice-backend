const productRepository = require('../repositories/productRepository');
const { validationResult } = require('express-validator');
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { product_name, description, price, category_id, quantity } = req.body;

        // Enregistrer le chemin relatif de l'image
        const image_url = req.file ? `uploads/${req.file.filename}` : null;

        // Créer le produit avec l'URL de l'image relative
        const product = await productRepository.createProduct({
            product_name,
            description,
            price,
            category_id,
            quantity,
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
    const { sort, ...filters } = req.query;
    
    const options = {
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
        const { product_name, description, price, category_id, quantity } = req.body;
        let image_url = null;

        // Si un fichier est téléchargé
        if (req.file) {
            const fileName = req.file.filename; // Récupérer uniquement le nom du fichier
            image_url = path.join('uploads', fileName); // Construire l'URL sous la forme 'uploads/filename'
        }

        // Mettre à jour le produit dans la base de données
        const [updated] = await productRepository.updateProduct(id, {
            product_name,
            description,
            price,
            category_id,
            quantity,
            image_url // Inclure l'URL relative de l'image
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
const updateProductRating = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const product = await productRepository.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        // Mettre à jour la note du produit
        product.ratings = rating;
        await product.save();

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de la note du produit' });
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
const registerProductClick = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Received request to register click for product ID: ${id}`);

        // Mettre à jour le compteur de clics du produit
        const product = await productRepository.getProductById(id);
        console.log('Product fetched:', product);
        
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        // Mettre à jour clickCount au lieu de clicks
        product.clickCount = product.clickCount ? product.clickCount + 1 : 1;
        await product.save();

        res.json({ message: 'Clic enregistré', product });
    } catch (error) {
        console.error('Error while registering click:', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'enregistrement du clic' });
    }
};



module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
    updateProductRating,
    registerProductClick,
};
