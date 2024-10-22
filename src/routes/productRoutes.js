const express = require('express');
const productController = require('../controllers/productController');
const favouriteController = require('../controllers/favourite.controller');
const { check } = require('express-validator');
const upload = require('../config/multerConfig');

const router = express.Router();

router.post('/', upload.single('image'), [
    check('product_name').notEmpty().withMessage('Le nom du produit est requis'),
    check('price').isNumeric().withMessage('Le prix doit être un nombre'),
    check('ratings').optional().isFloat({ min: 0, max: 5 }).withMessage('La note doit être entre 0 et 5'),
    check('quantity').isInt({ min: 0 }).withMessage('La quantité doit être un entier positif')
], productController.createProduct);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', upload.single('image'), [
    check('product_name').notEmpty().withMessage('Le nom du produit est requis'),
    check('price').isNumeric().withMessage('Le prix doit être un nombre'),
    check('ratings').optional().isFloat({ min: 0, max: 5 }).withMessage('La note doit être entre 0 et 5'),
    check('quantity').isInt({ min: 0 }).withMessage('La quantité doit être un entier positif')
], productController.updateProduct);
router.put('/:id/rating', [
    check('rating').isFloat({ min: 0, max: 5 }).withMessage('La note doit être entre 0 et 5')
], productController.updateProductRating);

router.delete('/:id', productController.deleteProduct);
// router.get('/search', productController.searchProducts);

// Route pour ajouter/retirer un produit des favoris
router.post('/:productId/favourite', favouriteController.addToFavourites);

// Route pour récupérer les favoris d'un utilisateur
router.get('/users/:userId/favourites', favouriteController.getFavouritesByUser);
// Route pour retirer un produit des favoris
router.delete('/:productId/favourite', favouriteController.removeFavourite);
// Route pour enregistrer un clic sur un produit
router.post('/:id/click', productController.registerProductClick);
router.get('/recommendations/:userId', favouriteController.getRecommendations)



module.exports = router;
