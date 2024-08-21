function isValidId(id) {
  const regex = /^[0-9a-fA-F]+$/;
    return regex.test(id);
}

class ReportController {
  constructor(repository) {
    this.repository = repository;
  }
  /**
   * Signaler une publication (vote, sondage, ..._)
   *
   * @param {Request} req
   * @param {Response} res
   * @returns any
   */
  report = async (req, res) => {
    try {
      const user_id = req.params.id;
      const item_id = req.params.item;
      const comment = req.body.comment;

      if (isValidId(user_id) && isValidId(item_id)) {
        try {
          const response = await this.repository.report({
            id: user_id,
            item: item_id,
            comment: comment,
          });
          return res.status(201).json({ data: response });
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({
          error: "Not authorized",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  getAllReportsByItem = async (req, res) => {
    try {
      const item_id = req.params.item;
      const posts = await this.repository.getAllReportsByItem(item_id);
      return res.status(200).json({ data: posts });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
}

module.exports = ReportController;
