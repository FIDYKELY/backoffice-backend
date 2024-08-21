const { Career } = require("../models/career.model");
const { DatabaseError } = require("../utils/error.util");

class CareerRepository {
  /**
   * Recuperer les carrieres d'un utilisateur
   *
   * @param {objectID} user_id
   * @returns array
   */
  async getAllLevel(user_id) {
    const careers = await Career.findAll({ 
      where : {user_id: user_id},
      order : [['createdAt', 'DESC']] });

    if (careers.length >= 0) {
      return careers;
    } else {
      throw new DatabaseError("Finding all level error");
    }
  }

  /**
   * ajouter un niveau de carriere ou une experience
   *
   * @param {object} dataObject
   * @returns object
   */
  async addLevel(dataObject) {
    const start_date = dataObject.start_date;
    const end_date = dataObject.end_date;
    const post = dataObject.post;
    const descriptions = dataObject.descriptions;
    const company = dataObject.company;
    const user_id = dataObject.user_id;

    const new_career = await Career.create({
      user_id: user_id,
      start_date: start_date,
      end_date: end_date,
      post: post,
      descriptions: descriptions,
      company: company,
    });

    if (new_career) {
      return new_career;
    } else {
      throw new DatabaseError("Adding level error");
    }
  }

  /**
   * Mettre a jour une experience
   *
   * @param {object} dataObject
   * @returns object
   */
  async updateLevel(dataObject) {
    const career_id = dataObject.career_id;
    const start_date = dataObject.start_date;
    const end_date = dataObject.end_date;
    const post = dataObject.post;
    const descriptions = dataObject.descriptions;
    const company = dataObject.company;

    const career = await Career.findByPk(career_id);
    career.start_date = start_date;
    career.end_date = end_date;
    career.post = post;
    career.descriptions = descriptions;
    career.company = company;
    career.save();
    
    if (career) {
      return career;
    } else {
      throw new DatabaseError("Updating level error");
    }
  }

  /**
   * Supprimer une experience
   *
   * @param {objectId} career_id
   * @returns boolean
   */
  async deleteLevel(career_id) {
    const career = await Career.destroy({
      where: {
         id: career_id
      }});

    if (career) {
      return true;
    } else {
      throw new DatabaseError("Deleting level error");
    }
  }
}

module.exports = CareerRepository;
