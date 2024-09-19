const Favourite = require('../models/favourite.model'); // Assure-toi que le modèle est bien défini

// Fonction pour trouver un favori par utilisateur et produit
const findFavouriteByUserAndProduct = async (userId, productId) => {
    return await Favourite.findOne({
        where: {
            user_id: userId,
            product_id: productId
        }
    });
};

// Fonction pour ajouter un favori
const addFavourite = async (userId, productId) => {
    return await Favourite.create({ user_id: userId, product_id: productId });
};

// Fonction pour retirer un favori
const removeFavourite = async (userId, productId) => {
    return await Favourite.destroy({
        where: {
            user_id: userId,
            product_id: productId
        }
    });
};

// Fonction pour récupérer tous les favoris d'un utilisateur
const findFavouritesByUser = async (userId) => {
    return await Favourite.findAll({
        where: {
            user_id: userId
        }
    });
};

module.exports = {
    findFavouriteByUserAndProduct,
    addFavourite,
    removeFavourite,
    findFavouritesByUser
};
