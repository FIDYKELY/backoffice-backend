const { User } = require('../models/user.model');
const { Op } = require('sequelize');
const {
  DatabaseError,
  AlreadyInUseError,
  UploadImageError,
} = require('../utils/error.util');

class UserRepository {
  /**
   * Récupérer tous les utilisateurs
   *
   * @returns array
   */
  async getAllUser() {
    try {
      const users = await User.findAll({
        order: [['createdAt', 'DESC']]
      });
      return users;
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Problème de récupération des utilisateurs");
    }
  }

  /**
   * Récupérer un utilisateur par son ID
   *
   * @param {number} userId
   * @returns object
   */
  async getOneUserById(userId) {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        return user;
      } else {
        throw new DatabaseError("Utilisateur non trouvé");
      }
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Problème de récupération de l'utilisateur");
    }
  }

  /**
   * Créer un nouvel utilisateur
   *
   * @param {object} dataObject
   * @returns object
   */
  async createUser(dataObject) {
    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { email: dataObject.email },
            { phone: dataObject.phone }
          ]
        }
      });

      if (existingUser) {
        throw new AlreadyInUseError("Email ou téléphone déjà utilisé");
      }

      const newUser = await User.create(dataObject);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Problème de création de l'utilisateur");
    }
  }

  /**
   * Mettre à jour un compte utilisateur
   *
   * @param {object} dataObject
   * @returns objectId id de l'utilisateur
   */
  async updateOneUser(dataObject) {
    try {
      const checkEmail = await User.findOne({
        where: {
          email: dataObject.email,
          id: {
            [Op.ne]: dataObject.user_id
          }
        }
      });

      if (checkEmail) {
        throw new AlreadyInUseError("Email déjà utilisé par un autre compte");
      }

      const checkPhone = await User.findOne({
        where: {
          phone: dataObject.phone,
          id: {
            [Op.ne]: dataObject.user_id
          }
        }
      });

      if (checkPhone) {
        throw new AlreadyInUseError("Téléphone déjà utilisé par un autre compte");
      }

      const user = await User.findByPk(dataObject.user_id);
      if (user) {
        user.fullname = dataObject.fullname;
        user.email = dataObject.email;
        user.phone = dataObject.phone;
        user.gender = dataObject.gender;
        user.date_of_birth = dataObject.date_of_birth;
        user.city = dataObject.city;
        user.country = dataObject.country;

        await user.save();
        return user.id;
      } else {
        throw new DatabaseError("Utilisateur non trouvé pour mise à jour");
      }
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Problème de mise à jour du compte utilisateur");
    }
  }

  /**
   * Mettre à jour la photo de profil d'un utilisateur
   *
   * @param {object} dataObject
   * @returns string
   */
  async setAvatar(dataObject) {
    try {
      const userId = dataObject.userId;
      const file = dataObject.file;
      if (file.length > 0) {
        const user = await User.findByPk(userId);
        if (user) {
          user.avatar = file[0].path;
          await user.save();
          return user.avatar;
        } else {
          throw new DatabaseError("Utilisateur non trouvé pour mise à jour de la photo");
        }
      } else {
        throw new UploadImageError("Problème de téléchargement de l'image");
      }
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Problème de mise à jour de la photo de l'utilisateur");
    }
  }

  /**
   * Récupérer la photo de profil d'un utilisateur
   *
   * @param {number} userId
   * @returns string
   */
  async getAvatar(userId) {
    try {
      const user = await this.getOneUserById(userId);
      return user.avatar;
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Problème de récupération de la photo de l'utilisateur");
    }
  }

  /**
   * Supprimer un utilisateur
   *
   * @param {number} userId
   * @returns boolean
   */
  async deleteUser(userId) {
    try {
      const deleteUser = await User.destroy({
        where: { id: userId }
      });

      if (deleteUser) {
        return true;
      } else {
        throw new DatabaseError("Problème de suppression de l'utilisateur");
      }
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Problème de suppression de l'utilisateur");
    }
  }

  /**
   * Mettre à jour l'à propos d'un utilisateur
   *
   * @param {number} userId
   * @param {string} about
   * @returns string
   */
  async editUserAbout(userId, about) {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        user.about = about;
        await user.save();
        return user.about;
      } else {
        throw new DatabaseError("Utilisateur non trouvé pour mise à jour de l'à propos");
      }
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Problème de mise à jour de l'à propos");
    }
  }

  /**
   * Mettre à jour les compétences d'un utilisateur
   *
   * @param {number} userId
   * @param {string} skills
   * @returns string
   */
  async editUserSkill(userId, skills) {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        user.skills = skills;
        await user.save();
        return user.skills;
      } else {
        throw new DatabaseError("Utilisateur non trouvé pour mise à jour des compétences");
      }
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Problème de mise à jour des compétences");
    }
  }
}

module.exports = UserRepository;
