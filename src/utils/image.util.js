const fs = require('fs').promises; // Utilisez les promesses de fs
const path = require('path');
const { DeleteImageError } = require("./error.util");

class ImageUtil {
 static async deleteLocalImage(imagePath) {
    if (imagePath) {
      const basePath = path.join(__dirname, '..','..');
      const fullPath = path.join(basePath, imagePath);
      console.log(fullPath);
      try {
        await fs.unlink(fullPath); // Utilisez await pour attendre la résolution de la promesse
        return true; // Indique que la suppression a réussi
      } catch (err) {
        throw new DeleteImageError("Impossible de supprimer l'image", {
          image: imagePath,
          error: err.message, // Incluez le message d'erreur dans l'objet d'erreur
        });
      }
    } else {
      return false; // Indique que la suppression n'a pas été tentée
    }
 }
}

module.exports = ImageUtil;
