const { Report } = require("../models/report.model");
const { DatabaseError } = require("../utils/error.util");
const { User } = require("../models/user.model");

class ReportRepository {
  /**
   * SIgnaler une publication
   *
   * @param {object} dataObject
   * @returns object
   */
  async report(dataObject) {
    const user_id = dataObject.id;
    const item_id = dataObject.item;
    const comment = dataObject.comment;

    const report = await Report.create({
      reporter_id: user_id,
      item_id: item_id,
      comment: comment,
    });

    if (report) {
      return report;
    } else {
      throw new DatabaseError("Probleme de signalement de publication");
    }
  }

  /**
   * 
   * @returns 
   */
  async getAllReportsByItem(item_id) {
    const reports = await Report.findAll({
      where: {
        item_id: item_id
      },
      order: [
        ["createdAt", "desc"]
      ]
    });

    if (reports) {
      const results = [];
      for (let report of reports) {
        const owner = await User.findByPk(report.reporter_id);
        // console.log(picture);
        results.push({
          report: report,
          owner: owner,
        });
      }

      return results;
    } else {
      throw new DatabaseError("Probleme de recuperation des votes");
    }
  }
}

module.exports = ReportRepository;
