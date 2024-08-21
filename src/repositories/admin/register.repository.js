const { Account } = require("../../models/admin/account.model");
const jwt = require("../../utils/jwt.util");
const bcrypt = require("bcryptjs");
const { DatabaseError, AlreadyInUseError } = require("../../utils/error.util");
const { API_KEY } = require("../../config/constant");
const ManageActivityController = require("../../controllers/admin/activity.controller");


class AdminRegisterRepository {
  /**
   * Creer un compte admin
   *
   * @param {object} accountObject
   * @param {ObjectId} adminId
   *
   * @returns object
   */
  async register(accountObject, adminId) {
    const checkEmailIfNotInUse = await Account.findAll({
      where: {
        email: accountObject.email,
        password: accountObject.password,
     },
    });

    if (checkEmailIfNotInUse.length == 0) {
      const encrypt_passwd = await bcrypt.hash(
        accountObject.password,
        API_KEY
      );

      if (encrypt_passwd) {
        const newAdminAccount = await Account.create({
          fullname: accountObject.fullname,
          email: accountObject.email,
          phone: accountObject.phone,
          password: encrypt_passwd,
        });

        if (newAdminAccount) {
          await ManageActivityController.add(
            newAdminAccount.id,
            adminId,
            "account",
            "register"
          );
          return {
            data: newAdminAccount.fullname,
            token: jwt.generateToken(newAdminAccount.id),
          };
        } else {
          throw new DatabaseError("Probleme de creation de compte admin");
        }
      }
    } else {
      throw new AlreadyInUseError("Email already in use");
    }
  }
}

module.exports = AdminRegisterRepository;
