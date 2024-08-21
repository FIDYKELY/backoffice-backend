const router = require("express").Router();
const ManageSignalementController = require("../../controllers/admin/signalement.controller");
const ManageSignalementRepository = require("../../repositories/admin/signalement.repository");
const checkTokenAccessMiddleware = require("../../middlewares/checkTokenAccess.middleware");

const signalementController = new ManageSignalementController(
  new ManageSignalementRepository()
);

router.get("/admin/:admin/reports", checkTokenAccessMiddleware, signalementController.getAllReport);
router.get("/admin/:admin/reports/:item", checkTokenAccessMiddleware, signalementController.show);
router.post(
  "/admin/:admin/reports/:item/destroy", checkTokenAccessMiddleware,
  signalementController.destroy
);
module.exports = router;
