// const { isValidObjectId } = require("mysql");
function isValidId(id) {
  return Number.isInteger(Number(id));
}

class PictureController {
  constructor(repository) {
    this.repository = repository;
  }  

  getAllPicture = async (req, res) => {
    try {
      const user_id = req.params.id;

      if (isValidId(user_id)) {
        const response = await this.repository.getAllPicture(user_id);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({ error: "Not authorized getAllPicture" });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  addPicture = async (req, res) => {
    try {
      const user_id = req.params.id;
      const picture_name = req.body.picture_name;

      if (isValidId(user_id)) {
        const response = await this.repository.addPicture(
          user_id,
          picture_name
        );
        return res.status(201).json({ data: response });
      } else {
        return res.status(401).json({ error: "Not authorized addPicture" });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  deletePicture = async (req, res) => {
    try {
      const user_id = req.params.id;
      const picture = req.params.picture;
      if (isValidId(user_id) && isValidId(picture)) {
        const response = await this.repository.deletePicture(picture);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({ error: "Not authorized deletePicture" });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
}

module.exports = PictureController;
