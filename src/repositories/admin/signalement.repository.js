const { Report } = require("../../models/report.model");
const UserRepository = require("../user.repository");
const RankRepository = require("../rank.repository");
const ManageActivityController = require("../../controllers/admin/activity.controller");

class ManageSignalementRepository {
  /**
   * Recupere les signalements de publication
   *
   * @returns object
   */
  async getAllReport() {
    const all = await Report.find().sort({ created_at: "desc" });
    const results = [];
    if (all.length > 0) {
      let owner,
        publication,
        type,
        created_at,
        items = [],
        reporter;
      for (const item of all) {
        created_at = item.created_at;
        const rank = new RankRepository();
        const user = new UserRepository();
        reporter = await user.getOneUserById(item.reporter_id);

        // On verifie si c'est un post
        const post = new PostRepository();
        const isPost = await post.getOnePost(item.item_id);
        if (Object.keys(isPost).length > 0) {
          type = "post";
          publication = isPost;
          owner = await user.getOneUserById(isPost.post.user_id);
          items = await rank.getRankByParentId(isPost.post._id);
        } else {

          // On verifie si c'est un poll
          const poll = new PollRepository();
          const isPoll = await poll.getOnePoll(item.item_id);
          if (Object.keys(isPoll).length > 0) {
            type = "poll";
            publication = isPoll;
            owner = await user.getOneUserById(isPoll.poll.user_id);
            items = await rank.getRankByParentId(isPoll.poll._id);
          } else {

            // On verifie si c'est un survey
            const survey = new SurveyRepository();
            const isSurvey = await survey.getOneSurvey(item.item_id);
            if (Object.keys(isSurvey).length > 0) {
              type = "survey";
              publication = isSurvey;
              owner = await user.getOneUserById(isSurvey.survey.user_id);
              items = await rank.getRankByParentId(isSurvey.survey._id);
            }
          }
        }
        
        if (publication && owner && reporter) {
          results.push({
            publication,
            type,
            owner,
            reporter,
            items,
            created_at,
          });
        }
      }

      return results;
    } else {
      throw new DatabaseError("Probleme de recuperation des signalements");
    }
  }
  /**
   * Supprimer un signalement
   *
   * @param {ObjectId} itemId
   * @param {ObjectId} adminId
   * @returns boolean
   */
  async destroy(itemId, adminId) {
    const post = new PostRepository();
    const deletePost = await post.deletePost(itemId);
    if (deletePost) {
      await ManageActivityController.add(
        "unknown",
        adminId,
        "delete report",
        "delete"
      );
      return true;
    } else {
      const poll = new PollRepository();
      const deletePoll = await poll.deletePoll(itemId);
      if (deletePoll) {
        await ManageActivityController.add(
          "unknown",
          adminId,
          "delete report",
          "delete"
        );
        return true;
      } else {
        const surver = new SurveyRepository();
        const deleteSurvey = await surver.deleteSurvey(itemId);
        if (deleteSurvey) {
          await ManageActivityController.add(
            "unknown",
            adminId,
            "delete report",
            "delete"
          );
          return true;
        } else {
          return false;
        }
      }
    }
  }

  /**
   * Recupere une publication signalee
   *
   * @param {objectId} itemId
   * @returns object
   */
  async show(itemId) {
    let owner,
      publication,
      items = [],
      result = {};
    const user = new UserRepository();
    const rank = new RankRepository();

    const post = new PostRepository();
    const isPost = await post.getOnePost(itemId);
    if (isPost) {
      publication = isPost;
      owner = await user.getOneUserById(isPost.user_id);
      items = await rank.getOneRankByParentId(isPost._id);
    } else {
      const poll = new PollRepository();
      const isPoll = await poll.getOnePoll(itemId);
      if (isPoll) {
        publication = isPoll;
        owner = await user.getOneUserById(isPoll.user_id);
        items = await rank.getOneRankByParentId(isPoll._id);
      } else {
        const survey = new SurveyRepository();
        const isSurvey = await survey.getOneSurvey(itemId);
        if (isSurvey) {
          publication = isSurvey;
          owner = await user.getOneUserById(isSurvey.user_id);
          items = await rank.getOneRankByParentId(isSurvey._id);
        }
      }
    }

    if (owner && publication) {
      result = { publication, owner, items };
    }

    return result;
  }
}

module.exports = ManageSignalementRepository;
