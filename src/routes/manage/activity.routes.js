const router = require("express").Router();
const ActivityController = require("../../controllers/admin/activity.controller");
const ManageActivityRepository = require("../../repositories/admin/activity.repository");

const activityController = new ActivityController(
  new ManageActivityRepository()
);
const checkTokenAccessMiddleware = require("../../middlewares/checkTokenAccess.middleware");

router.get("/admin/:admin/activities", checkTokenAccessMiddleware, activityController.getAllActivity);

module.exports = router;
