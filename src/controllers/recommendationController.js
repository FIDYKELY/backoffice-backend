// controllers/recommendationController.js
const getUserData = require('../repositories/recommendationRepository');
const { generateRecommendations } = require('../utils/collaborativeFiltering');

async function recommendProducts(req, res) {
  const userId = req.params.userId;

  try {
    // Récupérer les données de l'utilisateur
    const { favourites, purchases } = await getUserData(userId);

    // Simuler des évaluations basées sur les données récupérées
    const userRatings = favourites.map(fav => fav.Product.ratings);
    
    // Inclure le clickCount dans l'analyse (ajoutez une logique selon vos besoins)
    const userClicks = favourites.map(fav => fav.Product.clickCount);
    
    // Combinez les évaluations et les clics pour générer des recommandations
    const userActivity = userRatings.map((rating, index) => ({
      rating,
      clickCount: userClicks[index]
    }));

    // Récupérer les données de tous les utilisateurs
    const allUserRatings = await getAllUsersRatings(); // À implémenter pour obtenir les évaluations des autres utilisateurs

    // Ajoutez ici toute logique supplémentaire pour utiliser les clics dans la génération des recommandations

    // Générer les recommandations
    const recommendations = generateRecommendations(userActivity, allUserRatings);

    res.json({ recommendations });
  } catch (error) {
    console.error('Erreur lors de la recommandation:', error);
    res.status(500).send('Erreur lors de la recommandation');
  }
}

module.exports = { recommendProducts };
