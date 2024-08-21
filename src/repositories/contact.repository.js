const { Contact } = require("../models/contact.model");
const { DatabaseError } = require("../utils/error.util");

class ContactRepository {
  /**
   * Ajouter un contact
   *
   * @param {object} dataObject
   * @returns object
   */
  async contactUs(dataObject) {
    const user_id = dataObject.id;
    const message = dataObject.message;

    const contact = await Contact.create({
      user_id: user_id,
      message: message,
    });
    if (contact) {
      return contact;
    } else {
      throw new DatabaseError("Contacting us error");
    }
  }

  /**
   * Ajouter un contact
   *
   * @returns array
   */
  async getAllContact() {
    try {
      const contacts = await Contact.findAll({
        order: [['createdAt', 'DESC']], // Pour trier par ordre décroissant de createdAt
      });
  
      if (contacts.length > 0) {
        return contacts;
      } else {
        throw new DatabaseError("Erreur lors de la récupération de tous les contacts");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de tous les contacts :", error);
      throw new DatabaseError("Erreur lors de la récupération de tous les contacts");
    }
  }
  // async getAllContact() {
  //   const contacts = await Contact.find({}).sort({ createdAt: "desc" });
  //   if (contacts.length >= 0) {
  //     return contacts;
  //   } else {
  //     throw new DatabaseError("get all contact error");
  //   }
  // }
}

module.exports = ContactRepository;
