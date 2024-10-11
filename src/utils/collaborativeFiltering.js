// utils/collaborativeFiltering.js
function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (normA * normB);
  }
  
  function generateRecommendations(userRatings, allUserRatings) {
    const recommendations = [];
  
    allUserRatings.forEach((otherUserRatings) => {
      const similarity = cosineSimilarity(userRatings, otherUserRatings.ratings);
      recommendations.push({ user: otherUserRatings.user, similarity });
    });
  
    return recommendations.sort((a, b) => b.similarity - a.similarity).slice(0, 5); // Top 5 recommandations
  }
  
  module.exports = { cosineSimilarity, generateRecommendations };
  