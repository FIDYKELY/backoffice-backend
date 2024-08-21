const { Activity } = require("../../models/admin/activity.model");
const { isValidObjectId } = require("mysql");
const ManageAccountRepository = require("./account.repository");
const UserRepository = require("../user.repository");
const { DatabaseError } = require("../../utils/error.util");

class ManageActivityRepository {
  /**
   * Recupere toutes les actiivites dans le BO
   *
   * @returns object
   */
  async getAllActivity() {
    const activities = await Activity.find({}).sort({ created_at: "desc" });

    if (activities) {
      const results = [];
      var concerned, user;
      const account = new ManageAccountRepository();
      const userObj = new UserRepository();
      for (const activity of activities) {
        if (isValidObjectId(activity.user)) {
          user = await account.getOneAccount(activity.user);
        } else {
          user = activity.user;
        }

        if (isValidObjectId(activity.item)) {
          const isNewAccount = await account.getOneAccount(activity.item);
          if (isNewAccount) {
            concerned = isNewAccount;
          } else {
            const isUser = await userObj.getOneUserById(activity.item);
            if (isUser) {
              concerned = isUser;
            } 
          }
        } else {
          concerned = activity.item;
        }

        results.push({
          item: concerned,
          user: user,
          type: activity.type,
          category: activity.category,
          created_at: activity.created_at,
        });
      }
      return results;
    } else {
      throw new DatabaseError("Probleme de recuperation des activites");
    }
  }
}

module.exports = ManageActivityRepository;
