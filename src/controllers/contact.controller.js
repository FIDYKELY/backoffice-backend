const { isValidObjectId } = require("mysql");

class ContactController {
  constructor(repository) {
    this.repository = repository;
  }
  contactUs = async (req, res) => {
    try {
      const user_id = req.body.id;
      const message = req.body.message;

      if (user_id) {
        const response = await this.repository.contactUs({
          id: user_id,
          message: message,
        });
        return res.status(201).json({ data: response });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  getAllContact = async (req, res) => {
    try {
      const response = await this.repository.getAllContact();
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ContactController;
