// const { isValidObjectId } = require("mysql");
const PublicationRepository = require("../repositories/publication.repository");

function isValidId(id) {
  return Number.isInteger(Number(id));
}

class PollController {
  constructor(repository) {
    this.repository = repository;
  }
  /**
   * Creer une nouvelle vote
   *
   * @param {Request} req
   * @param {Response} res
   */
  addPoll = async (req, res) => {
    try {
      const user_id = req.params.id;
      if (isValidId(user_id)) {
        const descriptions = req.body.descriptions;
        const items = req.files;
        const response = await this.repository.addPoll({
          id: user_id,
          descriptions: descriptions,
          files: items,
        });
        return res.status(201).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized addPoll",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  /**
   * Supprimer un vote
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  deletePoll = async (req, res) => {
    try {
      const user_id = req.params.id;
      const poll = req.params.poll;
      if (isValidId(user_id) && isValidId(poll)) {
        const response = await this.repository.deletePoll(poll);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized deletePoll",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  /**
   * Recuperer tous les votes de l'utilisateur courant
   *
   * @param {Request} req
   * @param {Response} res
   */
  getPoll = async (req, res) => {
    try {
      const user_id = req.params.id;
      if (isValidId(user_id)) {
        const response = await this.repository.getPollByOwner(user_id);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized getPoll",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  getPollPaginaton = async (req,res) => {
    console.log("cc");
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try {
      const pub = await this.repository.getAllPoll();

      if(pub.length < 10){
        res.json({
          data: pub,
          nextPage: 0,
          prevPage: 0
        });
      }else{
        const paginatedData = await this.repository.paginateData(pub , pageNumber, pageSize);
        const nextPage = pageNumber * pageSize < pub.length ? pageNumber + 1 : null;
        const prevPage = pageNumber > 1 ? pageNumber - 1 : null;

        res.json({
          data: paginatedData,
          nextPage: nextPage,
          prevPage: prevPage
        });
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Recupere toutes les votes
   *
   * @param {Request} req
   * @param {Response} res
   */
  getAllPoll = async (req, res) => {
    try {
      const response = await this.repository.getAllPoll();
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  /**
   * Recupere une vote
   *
   * @param {Request} req
   * @param {Response} res
   */
  getOnePoll = async (req, res) => {
    try {
      const poll = req.params.poll;
      if (isValidId(poll)) {
        const response = await this.repository.getOnePoll(poll);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized getOnePoll",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  /**
   * Recupere la statistique par jour, mois ou an
   *
   * @param {Request} req
   * @param {Response} res
   */
  getStatisticPoll = async (req, res) => {
    try {
      const etat = req.params.etat;
      if (isValidId(etat)) {
        const response = await this.repository.statistic(etat);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized getStatisticPoll",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
}

module.exports = PollController;
