const { isValidObjectId } = require("mysql");

class ManageSignalementController {
  constructor(repository) {
    this.repository = repository;
  }
  getAllReport = async (req, res) => {
    try {
      const adminId = req.params.admin;
      if (isValidObjectId(adminId)) {
        const responses = await this.repository.getAllReport();

        return res.status(200).json({ data: responses });
      } else {
        return res.status(401).json({ error: "Not authorized", code: 401 });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  destroy = async (req, res) => {
    try {
      const adminId = req.params.admin;
      const itemId = req.body.item;

      if (isValidObjectId(adminId) && isValidObjectId(itemId)) {
        const deletePost = await this.repository.destroy(itemId, adminId);
        return res.status(200).json({ data: deletePost });
      } else {
        return res.status(401).json({ error: "Not authorized", code: 401 });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  show = async (req, res) => {
    try {
      const adminId = req.params.admin;
      const itemId = req.params.item;
      if (isValidObjectId(adminId)) {
        const post = await this.repository.show(itemId);
        return res.status(200).json({ data: post });
      } else {
        return res.status(401).json({ error: "Not authorized", code: 401 });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ManageSignalementController;
