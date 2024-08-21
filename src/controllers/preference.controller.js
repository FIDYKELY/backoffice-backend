// const { isValidObjectId } = require("mysql");

function isValidId(id) {
  return Number.isInteger(Number(id));
}

class PreferenceController {
  constructor(repository) {
    this.repository = repository;
  }
  changePreference = async (req, res) => {
    try {
      const user_id = req.body.user_id;
      const value = req.body.value; // true
      const param = req.body.param; // 'showEmail'

      if (isValidId(user_id)) {
        const response = await this.repository.changePreference({
          user_id: user_id,
          value: value,
          param: param,
        });
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized for changePreference",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  getPreferenceSetting = async (req, res) => {
    try {
      const user_id = req.params.id;

      if (isValidId(user_id)) {
        const response = await this.repository.getPreferenceSetting(user_id);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized to do this action getPreferenceSetting",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

module.exports = PreferenceController;
