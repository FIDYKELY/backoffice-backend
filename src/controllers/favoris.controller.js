const { isValidObjectId } = require("mysql");

class FavorisController {
  constructor(repository) {
    this.repository = repository;
  }
  saveItem = async (req, res) => {
    try {
      const item = req.body.item;
      const type = req.body.type;
      const userId = req.params.id;
  
      if (userId && item) {
        const response = await this.repository.saveItem({
          item: item,
          type: type,
          userId: userId
        });
        return res.status(201).json({ data: response });
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  getAllPublicationFavoris = async (req, res) => {
    try {
      const userId = req.params.id;
      if (userId) {
        const response = await this.repository.getAllPublicationFavoris(
          userId
        );
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  getAllContactFavoris = async (req, res) => {
    try {
      const userId = req.params.id;

      if (userId) {
        const response = await this.repository.getAllContactFavoris(userId);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  unsaveItem = async (req, res) => {
    try {
      const userId = req.params.id;
      const item = req.body.item;

      if (userId) {
        const response = await this.repository.unsaveItem(item);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

module.exports = FavorisController;
