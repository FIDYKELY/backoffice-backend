const { Favoris } = require("../models/favoris.model");
const { DatabaseError } = require("../utils/error.util");

class FavorisRepository {
  /**
   * Enregistrer une publication ou un contact
   *
   * @param {object} dataObject
   * @returns object
   */
  async saveItem(dataObject) {
    const item = dataObject.item;
    const type = dataObject.type;
    const userId = dataObject.userId;

    const check = await Favoris.findAll({
      item: item,
    });

    if (check.length === 0) {
      const newFavoris = await Favoris.create({
        item: item,
        user_id: userId,
        type: type,
      });

      if (newFavoris) {
        return newFavoris;
      } else {
        throw new DatabaseError("Save item to favoris error");
      }
    }

    return false;
  }

  /**
   * Recuperer les publications sauvegardee
   *
   * @param {objectId} userId
   * @returns array
   */
  async getAllPublicationFavoris(userId) {
    const favoris = await Favoris.findAll({
      saver: userId,
      $nor: [{ type: "contact" }],
    }).sort({ created_at: "desc" });

    if (favoris.length >= 0) {
      const results = [];
      for (const favori of favoris) {
        let publication;

        if (favori.type === "post") {
          const postObj = new PostRepository();
          publication = await postObj.getOnePost(favori.item);
        }

        if (favori.type === "poll") {
          const pollObj = new PollRepository();
          publication = await pollObj.getOnePoll(favori.item);
        }

        if (favori.type === "survey") {
          const surveyObj = new SurveyRepository();
          publication = await surveyObj.getOneSurvey(favori.item);
        }

        if (Object.keys(publication).length > 0) {
          results.push({
            publication: {
              owner: publication.owner.fullname,
              item: publication,
              type: favori.type,
              item_id: favori.item,
            },
          });
        }
      }

      return results;
    } else {
      throw new DatabaseError("Getting all post in favoris error");
    }
  }

  /**
   * Recuperer les contacts
   *
   * @param {objectId} userId
   * @returns array
   */
  async getAllContactFavoris(userId) {
    const favoris = await Favoris.findAll({
      saver: userId,
      type: "contact",
    }).sort({ created_at: "desc" });

    if (favoris.length >= 0) {
      const results = [];
      const userObj = new UserRepository();
      for (const favori of favoris) {
        const user = await userObj.getOneUserById(favori.item);
        results.push(user);
      }
      return results;
    } else {
      throw new DatabaseError("Getting all contact in favoris error");
    }
  }

  /**
   * Enlever un item dans le favoris
   *
   * @param {objectId} item
   * @returns boolean
   */
  async unsaveItem(item) {
    try {
      const result = await Favoris.findOne({
        where: { item: item }
      });
  
      if (result) {
        await result.destroy();
        return true;
      } else {
        throw new DatabaseError("Unsave an item in favoris error");
      }
    } catch (error) {
      console.error("Error while unsaving an item in favoris:", error);
      throw new DatabaseError("Unsave an item in favoris error");
    }
  }
  // async unsaveItem(item) {
  //   const result = await Favoris.findOneAndDelete({ item: item });

  //   if (result) {
  //     return true;
  //   } else {
  //     throw new DatabaseError("Unsave an item in favoris error");
  //   }
  // }
}

module.exports = FavorisRepository;
