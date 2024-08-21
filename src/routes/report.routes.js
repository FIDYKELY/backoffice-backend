const router = require("express").Router();
const ReportController = require("../controllers/report.controller");
const ReportRepository = require("../repositories/report.repository");
const controller = new ReportController(new ReportRepository());
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

router.post("/users/:id/items/:item/report", checkTokenAccessMiddleware, controller.report); 
router.get("/getAllReportsByItem/:item" , checkTokenAccessMiddleware, controller.getAllReportsByItem);

module.exports = router;
