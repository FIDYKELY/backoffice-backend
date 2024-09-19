const favouriteRepository = require('../repositories/favourite.repository');
const { User } = require('../models/user.model');

const addToFavourites = async (req, res) => {
    try {
        const { userId } = req.body;
        const { productId } = req.params;

        // Vérification si l'utilisateur existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        if (!userId || !productId) {
            return res.status(400).json({ message: 'User ID ou Product ID manquant.' });
        }

        const existingFavourite = await favouriteRepository.findFavouriteByUserAndProduct(userId, productId);

        if (existingFavourite) {
            await favouriteRepository.removeFavourite(userId, productId);
            return res.status(200).json({ message: 'Produit retiré des favoris' });
        } else {
            await favouriteRepository.addFavourite(userId, productId);
            return res.status(200).json({ message: 'Produit ajouté aux favoris' });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour des favoris', error);
        return res.status(500).json({ message: 'Erreur serveur lors de la mise à jour des favoris' });
    }
};
;

const getFavouritesByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'User ID manquant.' });
        }

        const favourites = await favouriteRepository.findFavouritesByUser(userId);

        return res.status(200).json(favourites);
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris', error);
        return res.status(500).json({ message: 'Erreur serveur lors de la récupération des favoris' });
    }
};

module.exports = {
    addToFavourites,
    getFavouritesByUser
};
