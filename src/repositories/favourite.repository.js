// favourite.repository.js
const Favourite = require('../models/favourite.model'); // Assurez-vous que le modèle est bien défini
const { Op, Sequelize } = require('sequelize'); // Importez Op et Sequelize

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

// Fonction pour obtenir des recommandations
const getRecommendations = async (userId) => {
    // Obtenez les produits favoris de l'utilisateur
    const userFavourites = await Favourite.findAll({
        where: { user_id: userId }
    });

    const favouriteProductIds = userFavourites.map(fav => fav.product_id);

    // Trouvez d'autres utilisateurs qui ont aimé ces produits
    const recommendations = await Favourite.findAll({
        where: {
            product_id: {
                [Op.not]: favouriteProductIds // Exclure les produits déjà favoris
            },
            user_id: {
                [Op.ne]: userId // Exclure l'utilisateur lui-même
            }
        },
        group: ['product_id'], // Grouper par produit pour éviter les doublons
        having: Sequelize.fn('COUNT', Sequelize.col('product_id')), // Compter les occurrences
        order: [[Sequelize.fn('COUNT', Sequelize.col('product_id')), 'DESC']], // Trier par le nombre de fois que le produit a été favorisé
        limit: 5 // Limiter le nombre de recommandations
    });

    return recommendations;
};

module.exports = {
    findFavouriteByUserAndProduct,
    addFavourite,
    removeFavourite,
    findFavouritesByUser,
    getRecommendations // N'oubliez pas d'exporter la fonction
};
