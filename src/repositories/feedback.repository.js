const mongoose = require("mysql");
const { Sequelize } = require('sequelize');
const { Feedback } = require("../models/feedback.model");
const { DatabaseError } = require("../utils/error.util");
const UserRepository = require("./user.repository");

class FeedbackRepository {
  /**
   * ENvoyer un retour sur un profil
   *
   * @param {object} dataObject
   * @returns object
   */
  async sendFeedback(dataObject) {
    const star = dataObject.star;
    const comment = dataObject.comment;
    const rater_id = dataObject.rater_id;
    const annuaire_id = dataObject.annuaire;

    const ifAleardyGiveFb = await Feedback.findAll({
      where:
     { rater_id: rater_id,
      user_id: annuaire_id,}
    });

    if (ifAleardyGiveFb.length > 0) {
      const feedback = await Feedback.update(
        {
          star: star,
          comment: comment,
        },
        {
          where: {
            rater_id: rater_id,
            user_id: annuaire_id,
          },
           // Cette option est spécifique à PostgreSQL
        }
      );
      return feedback;
    } else if (ifAleardyGiveFb.length === 0) {
      const feedback = await Feedback.create({
        star: star,
        rater_id: rater_id,
        user_id: annuaire_id,
        comment: comment,
      });
      return feedback;
    } else {
      throw new DatabaseError("Sending feedback error");
    }
  }
  /**
   * Recupere un retour (note) sur un utilisateur
   *
   * @param {objectId} annuaire_id
   * @param {number} note
   * @returns number
   */
  async getFeedback(annuaire_id) {
    let note = 0;
    
    // Compter le nombre d'évaluations pour un utilisateur spécifique
    const numberOfRater = await Feedback.count({
      where: { user_id: annuaire_id },
    });
    
  
    if (numberOfRater) {
      // Calculer la somme des étoiles pour un utilisateur spécifique
      const sumOfStarResult = await Feedback.findAll({
        where: { user_id: annuaire_id },
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('star')), 'totalStars'],
        ],
        raw: true,
      });
  
      const sumOfStar = sumOfStarResult[0].totalStars;
  
      if (numberOfRater > 0 && sumOfStar > 0) {
        note = sumOfStar / numberOfRater;
      }
  
      return note.toFixed(1);
    }
    return note;
  }
  

  /**
   * Recuperer les listes de retour d'un utilisateur
   *
   * @param {objectId} annuaire_id
   * @returns array
   */
  async getFeedbackList(annuaire_id) {
    
    const feedbacks = await Feedback.findAll({
     where:{ user_id: annuaire_id},
    });
   

    if (feedbacks.length >= 0) {
      const all = [];
      const userObj = new UserRepository();
      for (const feedback of feedbacks) {
        const sender = await userObj.getOneUserById(feedback.rater_id);
        all.push({
          id: feedback["id"],
          rater_name: sender["fullname"],
          star: feedback["star"],
          comment: feedback["comment"],
          createdAt: feedback["createdAt"],
          avatar: sender["avatar"],
        });
      }
      return all;
    } else {
      throw new DatabaseError("Getting all feedback error");
    }
  }

  /**
   *Verifier si un utilssateur a deja donne une note a un annuaire

   * @param {ObjectId} current_user_id
   * @param {ObjectId} annuaire_id
   * @returns object
   */
  async isAleardyGiveFeedback(current_user_id, annuaire_id) {
    const feedback = await Feedback.findAll({
      where:
     { rater_id: current_user_id,
      user_id: annuaire_id,}
    });

    if (feedback.length >= 0) {
      return feedback;
    } else {
      throw new DatabaseError("Checking feedback error");
    }
  }
}

module.exports = FeedbackRepository;
