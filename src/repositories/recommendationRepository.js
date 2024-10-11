const Product = require('../models/product');
const UserFavourite = require('../models/favourite.model');
const PaymentProduct = require('../models/paymentProduct');

// Récupérer les données de l'utilisateur pour le filtrage collaboratif
async function getUserData(userId) {
  try {
    // Récupérer les produits favoris de l'utilisateur avec clickCount
    const favourites = await UserFavourite.findAll({
      where: { user_id: userId },
      include: [{
        model: Product,
        as: 'product', // Utiliser l'alias défini dans le modèle Favourite
        attributes: ['id', 'product_name', 'clickCount'] // Inclure clickCount ici
      }]
    });

    // Récupérer l'historique des achats de l'utilisateur avec clickCount
    const purchases = await PaymentProduct.findAll({
      where: { user_id: userId },
      include: [{
        model: Product,
        as: 'product', // Assurez-vous que l'alias est défini dans PaymentProduct s'il est utilisé
        attributes: ['id', 'product_name', 'clickCount'] // Inclure clickCount ici
      }]
    });

    return { favourites, purchases };
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
  }
}

module.exports = getUserData;
