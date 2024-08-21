const { Rank } = require("../models/rank.model");
const { Rater } = require("../models/rater.model");
const { Poll } = require("../models/poll.model");
const { Post } = require("../models/post.model");
const { Survey } = require("../models/survey.model");
const { Notification } = require("../models/notification.model");

const RankRepository = require("./rank.repository");

const { DatabaseError } = require("../utils/error.util");
const { error } = require("../utils/loggin.util");

class RateRepository {
  /**
   * Voter sur un item de vote
   *
   * @param {objectId} userId
   * @param {objectId} itemId
   * @returns number
   */
  async rateAnItem(userId, itemId) {
    const allLastRate = await Rank.findByPk(itemId);
   let descriptionVote=null;
   console.log('ato v louh s t');
   console.log(allLastRate);
    
    if(allLastRate){ 
      descriptionVote = await Poll.findAll({where : {user_id : allLastRate.parent_id}});
    }
    console.log(descriptionVote);
    try {
      const notiflike = await Notification.findOne({
        where : {
        sender_id : userId,
        type: 'likeItem',
        is_seen:true}
      });
    
    const isAlreadyRate = await Rater.findOne({
      where : {
      user_id: userId,
      item_id: itemId }
    });

    if (allLastRate) {
      // if user already did rate
      if (isAlreadyRate) {
        // if user rate to true
        if (isAlreadyRate.status === true) {
          await Rank.increment(
            'likes', // Le champ à incrémenter
            {
              by: -1, // La valeur d'incrément
              where: {
                id: itemId // La condition qui cible l'enregistrement spécifique
              },
              // La partie suivante est optionnelle et dépend de votre base de données
             
            }
          );
          // const decrementRank = await Rank.findByIdAndUpdate(itemId, {
          //   rank: (allLastRate.rank -= 1),
          // });

          const updateRaterStatus = await Rater.update(
            {
              status: 'false'
            },
            {
              user_id: userId,
              item_id: itemId,
            }
          );
        } else {
          await Rank.increment(
            'likes', // Le champ à incrémenter
            {
              by: 1, // La valeur d'incrément
              where: {
                id: itemId // La condition qui cible l'enregistrement spécifique
              },
              // La partie suivante est optionnelle et dépend de votre base de données
             
            }
          );
          const updateRater = await Rater.update(
            {
              status: 'true'
            },
            {
              where : {user_id: userId,
              item_id: itemId}
            }
          );
        }
      } else {
        const incrementRank = await Rank.findByPk(itemId);
        incrementRank.rank = allLastRate.rank += 1 ;
        incrementRank.save();
        // const incrementRank = await Rank.findByIdAndUpdate(itemId, {
        //   rank: (allLastRate.rank += 1),
        // });

        const addToRater = await Rater.create({
          user_id: userId,
          item_id: itemId,
          status: 'true',
        });
      }
      const isAlreadyRate = await Rater.findOne({
        where : {
        user_id: userId,
        item_id: itemId }
      });
  
      if (allLastRate) {
        // if user already did rate
        if (isAlreadyRate) {
          // if user rate to true
          if (isAlreadyRate.status === true) {
            const decrementLike = await Rank.findByPk(itemId);
            decrementLike.rank = allLastRate.rank -= 1;
            decrementLike.save();
            // const decrementRank = await Rank.findByIdAndUpdate(itemId, {
            //   rank: (allLastRate.rank -= 1),
            // });
  
            const updateRaterStatus = await Rater.update(
              {
                status: 'false'
              },
              {
                user_id: userId,
                item_id: itemId,
              }
            );
          } else {
            const incrementLike = await Rank.findByPk(itemId);
            incrementLike.rank = allLastRate.rank += 1;
            incrementLike.save();
            const updateRater = await Rater.update(
              {
                status: 'true'
              },
              {
                where : {user_id: userId,
                item_id: itemId}
              }
            );
          }
        } else {
          const incrementRank = await Rank.findByPk(itemId);
          incrementRank.rank = allLastRate.rank += 1 ;
          incrementRank.save();
          // const incrementRank = await Rank.findByIdAndUpdate(itemId, {
          //   rank: (allLastRate.rank += 1),
          // });
  
          const addToRater = await Rater.create({
            user_id: userId,
            item_id: itemId,
            status: 'true',
          });
        }
        return allLastRate.rank;
      } else {
        throw new DatabaseError(
          "Probleme de recuperation de nombre de vote sur un item de vote"
        );
      }
    }
  }
  catch(error){
    console.log(error);
  }
  }
  
    /**
     * Voter un vote
     *
     * @param {objectId} userId
     * @param {objectId} pollId
     * @returns number
     */
    async rateAPoll(userId, pollId) {
      const allLastLike = await Poll.findByPk(pollId);
      const notiflike = await Notification.findOne({
        sender_id : userId,
        item_id : pollId,
        type: 'likePoll',
        is_seen:true
      });
    
    const isAlreadyLike = await Rater.findOne({
      user_id: userId,
      item_id: pollId,
    });

    if (allLastLike) {
      // if user already did like
      if (isAlreadyLike) {
        // if user like is true
        if (isAlreadyLike.status === true) {
          await Poll.increment(
            'likes', // Le champ à incrémenter
            {
              by: -1, // La valeur d'incrément
              where: {
                id: pollId // La condition qui cible l'enregistrement spécifique
              },
              // La partie suivante est optionnelle et dépend de votre base de données
             
            }
          );
          // const decrementLike = await Poll.findByIdAndUpdate(pollId, {
          //   likes: (allLastLike.likes -= 1),
          // });

          const updateRaterStatus = await Rater.update(
            {
              status: 'false'
            },
            {
              where : {user_id: userId,
              item_id: pollId}
            }
          );
        } else {
          await Poll.increment(
            'likes', // Le champ à incrémenter
            {
              by: 1, // La valeur d'incrément
              where: {
                id: pollId // La condition qui cible l'enregistrement spécifique
              },
              // La partie suivante est optionnelle et dépend de votre base de données
             
            }
          );
          // const incrementLike = await Poll.findByIdAndUpdate(pollId, {
          //   likes: (allLastLike.likes += 1),
          // });

          const updateRater = await Rater.update(
            {
              status: 'true',
            },
            {
              where : {user_id: userId,
              item_id: pollId}
            }
          );
        }
      } else {
        const incrementLike = await Poll.findByIdAndUpdate(pollId, {
          likes: (allLastLike.likes += 1),
        });

        const addToRater = await Rater.create({
          user_id: userId,
          item_id: pollId,
          type: 'likePoll',
          is_seen:true
        });
      }
      const isAlreadyLike = await Rater.findOne({
        user_id: userId,
        item_id: pollId,
      });
  
      if (allLastLike) {
        // if user already did like
        if (isAlreadyLike) {
          // if user like is true
          if (isAlreadyLike.status === true) {
            const decrementLike = await Poll.findByPk(pollId);
            decrementLike.likes = allLastLike.likes -= 1;
            decrementLike.save();
            // const decrementLike = await Poll.findByIdAndUpdate(pollId, {
            //   likes: (allLastLike.likes -= 1),
            // });
  
            const updateRaterStatus = await Rater.update(
              {
                status: 'false'
              },
              {
                where : {user_id: userId,
                item_id: pollId}
              }
            );
          } else {
            const incrementLike = await Poll.findByPk(pollId);
            incrementLike.likes = allLastLike.likes += 1;
            incrementLike.save();
            // const incrementLike = await Poll.findByIdAndUpdate(pollId, {
            //   likes: (allLastLike.likes += 1),
            // });
  
            const updateRater = await Rater.update(
              {
                status: 'true',
              },
              {
                where : {user_id: userId,
                item_id: pollId}
              }
            );
          }
        } else {
          const incrementLike = await Poll.findByIdAndUpdate(pollId, {
            likes: (allLastLike.likes += 1),
          });
  
          const addToRater = await Rater.create({
            user_id: userId,
            item_id: pollId,
            status: true,
          });
        }
        console.log('ref avi natao like');
        return allLastLike.likes;
      } else {
        return "Probleme de recuperation de nombre de vote sur un vote";
      }
     
    }
   
  }

  /**
   * Vote sur un sondage
   *
   * @param {objectId} userId
   * @param {objectId} surveyId
   * @returns number
   */
  async rateASurvey(userId, surveyId) {
    const allLastLike = await Survey.findByPk(surveyId);
    const notiflike = await Notification.findOne({ 
      where : {
      sender_id : userId,
      item_id : surveyId,
      type: 'likeSurvey',
      is_seen : true } 
    })
    if(notiflike){
      notiflike.is_seen = false;
        await notiflike.save();
    }
    else{
      const notif = await Notification.create({
        sender_id: userId,
        item_id: surveyId,
        type: 'likeSurvey',
        is_seen:true
      });
    }

    const isAlreadyLike = await Rater.findOne({
      user_id: userId,
      item_id: surveyId,
    });

    if (allLastLike) {
      // if user already did like
      if (isAlreadyLike) {
        // if user like is true
        if (isAlreadyLike.status === true) {
          
          await Survey.increment(
            'likes', // Le champ à incrémenter
            {
              by: -1, // La valeur d'incrément
              where: {
                id: surveyId // La condition qui cible l'enregistrement spécifique
              },
              // La partie suivante est optionnelle et dépend de votre base de données
             
            }
          );

          const updateRaterStatus = await Rater.update(
            {
              status: 'false'
            },
            {
              user_id: userId,
              item_id: surveyId,
            }
          );
        } else {
          await Survey.increment(
            'likes', // Le champ à incrémenter
            {
              by: 1, // La valeur d'incrément
              where: {
                id: surveyId // La condition qui cible l'enregistrement spécifique
              },
              // La partie suivante est optionnelle et dépend de votre base de données
             
            }
          );
          const updateRater = await Rater.update(
            {
              status: 'true'
            },
            {
              where : {user_id: userId,
              item_id: surveyId}
            }
          );
        }
      } else {
        const incrementLike = await Survey.findOne({
            where : {id : surveyId}
          });
          incrementLike.likes = allLastLike.likes += 1;
          incrementLike.save();

        const addToRater = await Rater.create({
          user_id: userId,
          item_id: surveyId,
          status: true,
        });
      }
      return allLastLike.likes;
    } else {
      throw new DatabaseError(
        "Probleme de recuperation de nombre de vote sur un sondage"
      );
    }
  }

  /**
   * Voter une publications
   *
   * @param {objectId} userId
   * @param {objectId} postId
   * @returns number
   */
  async rateAPost(userId, postId) {
    const allLastLike = await Post.findByPk(postId);
    const notiflike = await Notification.findOne({
      where : {
      sender_id : userId,
      item_id : postId,
      type: 'likePost',
      is_seen : true  }
    })
    if(notiflike){
      notiflike.is_seen = false;
        await notiflike.save();
    }
    else{
      const notif = await Notification.create({
        sender_id: userId,
        item_id: postId,
        type: 'likePost',
        is_seen:true
      });
    }

    const isAlreadyLike = await Rater.findOne({
      where : {
      user_id: userId,
      item_id: postId }
    });
    

    if (allLastLike) {
      // if user already did like
      if (isAlreadyLike) {
        // if user like is true
        if (isAlreadyLike.status == true) {
          
          await Post.increment(
            'likes', // Le champ à incrémenter
            {
              by: -1, // La valeur d'incrément
              where: {
                id: postId // La condition qui cible l'enregistrement spécifique
              },
              // La partie suivante est optionnelle et dépend de votre base de données
             
            }
          );

          const updateRaterStatus = await Rater.update(
            {
              status: false
            },
            {
            where:  {user_id: userId,
              item_id: postId,}
            }
          );
        } else {
          await Post.increment(
            'likes', // Le champ à incrémenter
            {
              by: 1, // La valeur d'incrément
              where: {
                id: postId // La condition qui cible l'enregistrement spécifique
              },
              // La partie suivante est optionnelle et dépend de votre base de données
             
            }
          );

          const updateRater = await Rater.update(
            {
              status: true
            },
            {
            where: { user_id: userId,
              item_id: postId,}
            }
          );
        }
      } else {
        const getId = await Post.findByPk(postId);
        getId.likes = allLastLike.likes += 1 ;
        await getId.save();
        // const incrementLike = await Post.findByIdAndUpdate(postId, {
        //   likes: (allLastLike.likes += 1),
        // });

        const addToRater = await Rater.create({
          user_id: userId,
          item_id: postId,
          status: true,
        });
      }
      return allLastLike.likes;
    } else {
      throw new DatabaseError(
        "Probleme de recuperation de nombre de vote sur une publication"
      );
    }
  }

  /**
   * Verifier si l'utilisateur (courant) est un voteur ou pas
   *
   * @param {Objectid} userId
   * @param {objectId} itemId
   * @returns boolean
   */
  async getRater(userId, itemId) {
    
    let isRater = false;
    try {
      const rater = await Rater.findAll({
        where : {user_id: userId, item_id: itemId}
      });
      
      
      if (rater.length > 0) {
        for(let rate of rater){
          if (rate.status == true ) {
            console.log("true");
            isRater = true;
          } else {
            isRater = false;
            // console.log("false");
          }
        }
       
      }
      return isRater;
      
    } catch (error) {
      console.log(error);
    }
    

    
    
  }

  /**
   * Recuperer les voteurs d'une publications (sondage, vote, publication, partage
   * )
   * @param {objectId} itemId
   * @returns number
   */
  async getAllRaters(itemId) {
    const rankObj = new RankRepository();
    const ranks = await rankObj.getRankByParentId(itemId);
    console.log(ranks.length);
    if (ranks.length > 0) {
      try {
        let raters = 0;
        for (const rank of ranks) {
          const rates = await Rater.findAll({
            where : { item_id: rank.id }
          });
          console.log(rates.length);
          raters += rates.length;
        }
        console.log(raters);
        return raters;
      } catch (error) {
        console.log(error);
      }
      
    } else {
      return "Probleme de recuperation des likers" ;
      // throw new DatabaseError("Probleme de recuperation des likers");
    }
  }
}

module.exports = RateRepository;
