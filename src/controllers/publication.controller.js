const { Share } = require('../models/share.model');
const { Notification } = require('../models/notification.model');
const PublicationRepository = require("../repositories/publication.repository");

function isValidId(id) {
  return Number.isInteger(Number(id));
}

class PublicationController {
  constructor(repository) {
    this.repository = repository;
  }

  share = async (req, res) => {
    
    const publisher_id = req.params.user;
    const item_id = req.params.item;
    const owner_id = req.body.owner_id;
    const type = req.body.type;
    const comment = req.body.comment;
    

    if (isValidId(publisher_id)) {
      console.log(publisher_id,item_id,owner_id,type,comment);
      try {
        const shared = await Share.create({
          item: item_id,
          publisher_id: publisher_id,
          owner_id: owner_id,
          type: type,
          comment: comment,
        });
        const notiflike = await Notification.findOne({
          sender_id : publisher_id,
          item_id : item_id,
          type: 'share'+type,
          is_seen : true  
        })
        if(notiflike){
          notiflike.is_seen = false;
            await notiflike.save();
        }
        else{
          const notif = await Notification.create({
            sender_id: publisher_id,
            item_id: item_id,
            type: 'share'+type,
            is_seen:true
          });
        }
        if (shared) {
          return res.status(201).json({ data: shared });
        } 
      } catch (error) {
        console.log(error);
      }
      
    }else {
      return res.status(500).json({ error: "Cannot send user feedback" });
    }
  };
  getShareNumber = async (req, res) => {
    const item_id = req.params.item;

    const shares = await Share.findAll({
      where : {item: item_id}
    });

    if (shares) {
      return res.status(200).json({ data: shares.length });
    } else {
      return res.status(500).json({ error: "Cannot send user feedback" });
    }
  };

  getPublic = async(req, res) => {
    try {
      const pub = await this.repository.getPublication();
      return res.status(200).json({ data: pub });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    
  };

  getRecentPublication = async(req, res) => {
    try {
      const pub = await this.repository.getRecentPublication();
      return res.status(200).json({ data: pub });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    
  };

  getLatestPublication = async(req, res) => {
    try {
      const pub = await this.repository.getLatestPublication();
      return res.status(200).json({ data: pub });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    
  };

  rejectLatestPublication = async(req, res) => {
    try {
      const id = req.body.id;
      const type = req.body.type;
      const pub = await this.repository.rejectLatestPublication(id, type);
      return res.status(200).json({ data: pub });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  filterRecentPublication = async(req, res) => {
    try {
      const pub = await this.repository.filterRecentPublication();
      return res.status(200).json({ data: pub });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    
  };

  getStatisticPost = async (req, res) => {
    try {
      const etat = req.params.etat;
      if (isValidId(etat)) {
        const response = await this.repository.statistic(etat);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized getStatisticPost",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  getPagination = async(req,res) => {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try {
      const pub = await this.repository.getDataPublication();

      // Calculer le nombre total de pages
      const totalPages = Math.ceil(pub.length / pageSize);

      if(pub.length < pageSize){
        res.json({
          data: pub,
          nextPage: 0,
          numberpage: 0,
          prevPage: 0,
          totalPages: totalPages // Ajouter le nombre total de pages ici
        });
      }
      else{
        const page = new PublicationRepository();
        const paginatedData = await page.paginateData(pub , pageNumber, pageSize);
        const nextPage = pageNumber * pageSize < pub.length ? pageNumber + 1 : null;
        const prevPage = pageNumber > 1 ? pageNumber - 1 : null;

        res.json({
          data: paginatedData,
          nextPage: nextPage,
          prevPage: prevPage,
          totalPages: totalPages // Ajouter le nombre total de pages ici
        });
      }
      
    } catch (error) {
      console.log(error);
    } 
  }
}

module.exports = PublicationController;