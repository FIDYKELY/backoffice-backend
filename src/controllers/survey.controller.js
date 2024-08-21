function isValidId(id) {
  const regex = /^[0-9a-fA-F]+$/;
    return regex.test(id);
}

class SurveyController {
  constructor(repository) {
    this.repository = repository;
  }
  /**
   * Creer une nouvelle vote
   *
   * @param {Request} req
   * @param {Response} res
   */
  addSurvey = async (req, res) => {
    console.log("cc");
    try {

      const descriptions = req.body.descriptions;
      const items = req.body.items;
      const user_id = req.params.id;

      if (isValidId(user_id)) {
        try {
          const response = await this.repository.addSurvey({
            descriptions: descriptions,
            items: items,
            id: user_id,
          });
          return res.status(201).json({ data: response });
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({
          error: "Not authorized addSurvey",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  deleteSurvey = async (req, res) => {
    try {
      const surveyId = req.params.survey;

      if (isValidId(surveyId)) {
        const response = await this.repository.deleteSurvey(surveyId);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized deleteSurvey",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  /**
   * Recupere toutes les votes de l'utilisateur courant
   *
   * @param {Request} req
   * @param {Response} res
   */
  getSurvey = async (req, res) => {
    try {
      const userId = req.params.id;

      if (isValidId(userId)) {
        try {
          const response = await this.repository.getSurveyByOwner(userId);
          return res.status(200).json({ data: response });
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({
          error: "Not authorized getSurvey",
        });
      }
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
  getOneSurvey = async (req, res) => {
    try {
      const surveyId = req.params.survey;

      if (isValidId(surveyId)) {
        try {
          const response = await this.repository.getOneSurvey(surveyId);
          return res.status(200).json({ data: response });
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({
          error: "Not authorized getOneSurvey",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  getAllSurvey = async (req, res) => {
    try {
      const response = await this.repository.getAllSurvey();
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  getSurveyPaginate = async (req,res) => {
    console.log("cc");
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try {
      const pub = await this.repository.getAllSurvey();

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
   * Recupere la statistique par jour, mois ou an
   *
   * @param {Request} req
   * @param {Response} res
   */
  getStatisticSurvey = async (req, res) => {
    try {
      const etat = req.params.etat;
      if (isValidId(etat)) {
        const response = await this.repository.statistic(etat);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized getStatisticSurvey",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
}

module.exports = SurveyController;
