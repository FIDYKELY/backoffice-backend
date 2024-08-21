const { isValidObjectId } = require("mysql");

class MessageController {
  constructor(repository) {
    this.repository = repository;
  }
  /**
   * Envoyer un message
   *
   * @param {Request} req
   * @param {Response} res
   */
  sendMessage = async (req, res) => {
    if (
      (req.params.id) &&
      (req.params.receiver)
    ) {
      const content = req.body.content;
      const items = req.files;
      const sender_id = req.params.id;
      const receiver_id = req.params.receiver;

      if (items !== undefined && items.length > 0) {
        try {
          const response = await this.repository.sendMessage({
            files: items,
            sender_id: sender_id,
            receiver_id: receiver_id,
          });
          return res.status(201).json({ data: response });
        } catch (error) {
          return res.status(500).json({
            error: error.message,
          });
        }
      }

      if (content !== undefined && content.length > 0) {
        try {
          const response = await this.repository.sendMessage({
            content: content,
            sender_id: sender_id,
            receiver_id: receiver_id,
          });
          return res.status(201).json({ data: response });
        } catch (error) {
          return res.status(500).json({
            error: error.message,
          });
        }
      }
    } else {
      return res.status(401).json({
        error: "Not authorized",
      });
    }
  };
  /**
   * Recupere toutes les messages de l'utilisateur courant avec le recepteur courant
   *
   * @param {Request} req
   * @param {Response} res
   */
  getMessage = async (req, res) => {
    try {
      const me = req.params.id;
      const other = req.params.receiver;
      if (me && other) {
        const response = await this.repository.getMessage(me, other);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  /**
   * Mettre en lu le dernier message
   *
   * @param {*} req
   * @param {*} res
   * @returns mixed
   */
  setAllMessageAsSeen = async (req, res) => {
    try {
      const friend_id = req.body.friend;
      const user_id = req.params.id;

      if (friend_id && user_id) {
        const response = await this.repository.setAllMessageAsSeen(
          user_id,
          friend_id
        );
        return res.status(200).json({ data: response });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  getNotSeenNumber = async (req, res) => {
    try {
      const user_id = req.params.id;
     
      const response = await this.repository.getNotSeenNumber(user_id);
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
}

module.exports = MessageController;
