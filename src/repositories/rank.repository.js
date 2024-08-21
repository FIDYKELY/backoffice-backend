const { Rank } = require("../models/rank.model");
const { DatabaseError } = require("../utils/error.util");


class RankRepository {
  /**
   * Recupere tous les items par l'ID de son parent
   *
   * @param {objectId} parentId
   * @returns object
   */
  async getRankByParentId(parentId) {
    const rank = await Rank.findAll({ 
      where : {parent_id: parentId} 
    });
    if (rank) {
      return rank;
    }
  }

  /**
   * Recupere un item par son id
   *
   * @param {objectId} parentId
   * @returns object
   */
  async getOneRankById(rankId) {
    const rank = await Rank.findOne({ where: {id: rankId} });
    if (rank) {
      return rank;
    }
  }

  /**
   * Supprimer des items par l'ID de son parent
   *
   * @param {objectId} parentId
   * @returns bool
   */
  async deleteRankByParentId(parentId) {
    console.log(parentId);
    const deleterank = await Rank.destroy({
      where: { parent_id: parentId }
    });
    if (deleterank || !deleterank) {
      return true;
    } else {
      throw new DatabaseError(
        "Probleme de suppression des rank de publication"
      );
    }
  }
}

module.exports = RankRepository;
