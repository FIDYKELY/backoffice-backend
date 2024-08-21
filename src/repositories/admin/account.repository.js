const { Account } = require("../../models/admin/account.model");
const bcrypt = require("bcryptjs");
const { DatabaseError } = require("../../utils/error.util");
const UserRepository = require("../user.repository");
const ManageActivityController = require("../../controllers/admin/activity.controller");

class ManageAccountRepository {
  /**
   * Recuperer les utilisateurs
   *
   * @returns array
   */
  async getAllUser() {
    const userObj = new UserRepository();
    const users = await userObj.getAllUser();
    if (users.length >= 0) {
      return users;
    } else {
      throw new DatabaseError("Probleme de recuperation des utilisateur");
    }
  }

  /**
   * Recupere les administrateurs (BO)
   *
   * @returns array
   */
  async getAllAdmin() {
    const admins = await Account.findAll({ createdAt: "desc" });
    if (admins.length >= 0) {
      return admins;
    } else {
      throw new DatabaseError("Probleme de recuperation des admins");
    }
  }

  /**
   * Supprimer un utilisateur depuis le BO
   * @param {ObjectId} userId utilisateur a supprimer
   * @param {ObjectId} adminId l'admin qui a supprime
   *
   * @returns bool
   */
  async deleteUser(userId, adminId) {
    const user = new UserRepository();
    const del = await user.deleteUser(userId);

    if (del) {
      await ManageActivityController.add(
        "unknwon",
        adminId,
        "delete user",
        "delete"
      );
      return true;
    } else {
      return false;
    }
  }

  /**
   * Supprimer un admin depuis le BO
   * @param {ObjectId} userId utilisateur a supprimer
   * @param {ObjectId} adminId l'admin qui a supprime
   *
   * @returns bool
   */
  async deleteAccount(accountId, adminId) {
    const delete_account = await Account.findByIdAndDelete(accountId);

    if (delete_account) {
      ManageActivityController.add(
        "unknwon",
        adminId,
        "delete account",
        "delete"
      );

      return true;
    } else {
      throw new DatabaseError("Probleme de suppression d'un admin");
    }
  }

  /**
   * Recupere les infos d'un compte admin
   *
   * @param {ObjectId} account
   *
   * @returns object
   */
  async getOneAccount(account) {
    const account_admin = await Account.findById(account);    
    return account_admin;
  }

  /**
   * Mettre a jour un compte admin
   *
   * @param {object} accountObject
   * @param {ObjectId} adminId
   *
   * @returns object
   */
  async updateAccount(accountObject, adminId) {
    const update_account = await Account.findByIdAndUpdate(accountObject.id, {
      fullname: accountObject.fullname,
      email: accountObject.email,
      phone: accountObject.phone,
    });

    if (update_account) {
      ManageActivityController.add(
        accountObject.id,
        adminId,
        "update account",
        "update"
      );
      return update_account;
    } else {
      throw new DatabaseError("Probleme de mise a jour d'un compte admin");
    }
  }

  /**
   * Mettre a jour le mot de passe d'un compte admin
   *
   * @param {ObjectId} accountId
   * @param {mixed} newPassword
   * @param {ObjectId} adminId
   *
   * @returns bool
   */
  async updatePassword(accountId, newPassword, adminId) {
    const encrypt_passwd = await bcrypt.hash(
      newPassword,
      process.env.API_KEY || "$2a$14$fuc6ZCGfcUmsG.GiUYmdGe"
    );

    if (encrypt_passwd) {
      const update_account = await Account.findByIdAndUpdate(accountId, {
        password: encrypt_passwd,
      });

      if (update_account) {
        ManageActivityController.add(
          accountId,
          adminId,
          "update account",
          "update"
        );
        return true;
      } else {
        throw new DatabaseError("Probleme de mise a jour de mot de passe");
      }
    } else {
      throw new DatabaseError("Probleme le cryptage du mot de passe");
    }
  }
}

module.exports = ManageAccountRepository;
