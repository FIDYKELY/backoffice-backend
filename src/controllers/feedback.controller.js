const mongoose = require("mysql");

class FeedbackController {
  constructor(repository) {
    this.repository = repository;
  }
  sendFeedback = async (req, res) => {
    try {
      if (
        (req.params.id) &&
        (req.params.annuaire)
      ) {
        const star = req.body.star;
        const comment = req.body.comment;
        const rater_id = req.params.id;
        const annuaire_id = req.params.annuaire;

        const response = await this.repository.sendFeedback({
          star: star,
          comment: comment,
          rater_id: rater_id,
          annuaire: annuaire_id,
        });

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
  getFeedback = async (req, res) => {
    try {
      const current_user_id = req.params.id;
      let annuaire_id = req.params.annuaire;

      if (
        (current_user_id) &&
        (annuaire_id)
      ) {
        const response = await this.repository.getFeedback(annuaire_id);
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
  getFeedbackList = async (req, res) => {
    try {
      const annuaire_id = req.params.annuaire;

      if ((annuaire_id)) {
        const response = await this.repository.getFeedbackList(annuaire_id);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  isAleardyGiveFeedback = async (req, res) => {
    try {
      const current_user_id = req.params.id;
      const annuaire_id = req.params.annuaire;

      if (
        (current_user_id) &&
        (annuaire_id)
      ) {
        const response = await this.repository.isAleardyGiveFeedback(
          current_user_id,
          annuaire_id
        );

        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

module.exports = FeedbackController;
