const { Message } = require("../models/message.model");
const cloudinary = require("../utils/cloudinary.util");
const { DatabaseError, ServerError } = require("../utils/error.util");
const UserRepository = require("./user.repository");



class MessageRepository {
  /**
   * Envoyer un message texte ou image
   *
   * @param {object} dataObject
   * @returns object
   */
  async sendMessage(dataObject) {
    const content = dataObject.content;
    const items = dataObject.files;
    const sender_id = dataObject.sender_id;
    const receiver_id = dataObject.receiver_id;

    //Envoyer une image
    if (items != undefined && items.length > 0) {
      for (let item of items) {
        const upload_img = await cloudinary.uploader.upload(item.path, {
          use_filename: true,
          width: 500,
          height: 500,
        });

        if (upload_img) {
          const new_message = await Message.create({
            content: upload_img.secure_url,
            sender_id: sender_id,
            receiver_id: receiver_id,
          });

          if (new_message) {
            const userObj = new UserRepository();
            const sender = await userObj.getOneUserById(new_message.sender_id);
            const receiver = await userObj.getOneUserById(
              new_message.receiver_id
            );

            const msg = {
              sender: sender,
              receiver: receiver,
              message: new_message,
            };

            return msg;
          } else {
            throw new DatabaseError("Probleme d'envoi de message (image)");
          }
        } else {
          throw new ServerError("Probleme d'envoi d'image");
        }
      }
    }

    // Envoyer un texte
    if (content != undefined && content.length > 0) {
      const new_message = await Message.create({
        content: content,
        sender_id: sender_id,
        receiver_id: receiver_id,
      });

      if (new_message) {
        const userObj = new UserRepository();
        const sender = await userObj.getOneUserById(new_message.sender_id);
        const receiver = await userObj.getOneUserById(new_message.receiver_id);

        const msg = {
          sender: sender,
          receiver: receiver,
          message: new_message,
        };

        return msg;
      } else {
        throw new DatabaseError("Probleme d'envoi de message (texte) ");
      }
    }
  }

  /**
   * Recuperer une discussion
   *
   * @param {objectId} me
   * @param {ObjectId} other
   * @returns array
   */
  async getMessage(me, other) {
    // var start = moment('2023-01-24T06:53:56.766+00:00').fromNow();
    const start = new Date().toDateString();
    console.log('date now',start)
    const messages = await Message.findAll({
      $or: [
        {
          sender_id: me,
          receiver_id: other,
          created_at: {$gte : start}
        },
        {
          receiver_id: me,
          sender_id: other,
          created_at: {$gte : start},
        },
      ],
    });
   
    if (messages) {
      const all = [];
      if (messages.length > 0) {
        const userObj = new UserRepository();
        for (const message of messages) {
          const sender = await userObj.getOneUserById(message.sender_id);
          const receiver = await userObj.getOneUserById(message.receiver_id);

          all.push({
            sender: sender,
            receiver: receiver,
            message: message,
          });
        }
      }
      
      return all;
    } else {
      throw new DatabaseError("Probleme de recuperation des messages");
    }
  }

  /**
   * Mettre comme lu le dernier message
   *
   * @param {objectId} user_id
   * @param {objectId} friend_id
   * @returns object
   */
  async setAllMessageAsSeen(user_id, friend_id) {
    const seen_last_message = await Message.findAll(
      {
        $or: [
          {
            sender_id: user_id,
            receiver_id: friend_id,
            is_seen:false,
          },
          {
            receiver_id: user_id,
            sender_id: friend_id,
            is_seen:false,
          },

        ],
      },
      {
        is_seen: true,
      }
    ).sort({ created_at: "desc" });

    if (seen_last_message) {
      if(seen_last_message.length>0){
        for(const message of seen_last_message ){
          message.is_seen=true;
          message.save();
        }
      }

      return true;
    } else {
      throw new DatabaseError("Probleme de mettre comme lu le dernier message");
    }
  }
  async getNotSeenNumber(user_id){
    
   
    const like = await Message.findAll({
      receiver_id: user_id,
      is_seen : false
   
      
     
    })
      
      
      if(like){
        console.log('isan message mbol ts ita:',like);
       return like.length
      }
      else{
        return 0;
      }
      
  }
}

module.exports = MessageRepository;
