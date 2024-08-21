const { isValidObjectId } = require("mysql");
const { Activity } = require("../../models/admin/activity.model");

class ManageActivityController {
  constructor(repository) {
    this.repository = repository;
  }
  static async add(item, user, type, category = "add") {
    const addActivity = await Activity.create({
      item,
      user,
      type,
      category,
    });

    if (!addActivity) {
      throw new DatabaseError("Probleme d'ajout d'activite");
    }
  }
  getAllActivity = async (req, res) => {
    try {
      if (isValidObjectId(req.params.admin)) {
        const activities = await this.repository.getAllActivity();

        return res.status(200).json({ data: activities });
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ManageActivityController;
