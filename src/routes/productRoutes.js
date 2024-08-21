const express = require('express');
const productController = require('../controllers/productController');
const { check } = require('express-validator');

const router = express.Router();

router.post('/', [// OKOK
    check('product_name').notEmpty().withMessage('Le nom du produit est requis'),
    check('price').isNumeric().withMessage('Le prix doit être un nombre')
], productController.createProduct);

router.get('/', productController.getAllProducts);// OKOK
router.get('/:id', productController.getProductById);
router.put('/:id', [// OKOK
    check('product_name').notEmpty().withMessage('Le nom du produit est requis'),
    check('price').isNumeric().withMessage('Le prix doit être un nombre')
], productController.updateProduct);

router.delete('/:id', productController.deleteProduct);// OKOK
router.get('/search', productController.searchProducts);// OKOK

module.exports = router;
