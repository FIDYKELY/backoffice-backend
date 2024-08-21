const { Preference } = require("../models/preference.model");
const { DatabaseError } = require("../utils/error.util");


class PreferenceRepository {
  /**
   * Changer la valeur d'un preference
   *
   * @param {object} dataObject
   * @returns boolean
   */
  async changePreference(dataObject) {
    const user_id = dataObject.user_id;
    const value = dataObject.value; // true
    const param = dataObject.param; // 'showEmail'

    const check = await Preference.findOne({
      where: {
        user_id: user_id,
        param: param
      }
    });

    await check.update({ value: value });
    await check.save();

    if (check) {
      return check;
    } else {
      const add = await Preference.create({
        user_id: user_id,
        param: param,
        value: value,
      });

      if (add) {
        return add;
      } else {
        throw new DatabaseError("Probleme d'ajout de preference");
      }
    }
  }

  /**
   * Recuperer les valeurs de preferences
   *
   * @param {objectId} user_id
   * @returns object
   */
  async getPreferenceSetting(user_id) {
    const pref = await Preference.findAll({
      where: {user_id: user_id}
    });

    if (pref) {
      const data = {};
      for (const item of pref) {
        if (item.param === "showPhoneNumber") {
          data.showPhoneNumber = item.value;
        }
        if (item.param === "showEmail") {
          data.showEmail = item.value;
        }
        if (item.param === "showDateOfBirth") {
          data.showDateOfBirth = item.value;
        }
      }
      return data;
    } else {
      throw new DatabaseError("Probleme de recuperation des preferences");
    }
  }
}

module.exports = PreferenceRepository;
