const router = require("express").Router();
const FeedbackController = require("../controllers/feedback.controller");
const FeedbackRepository = require("../repositories/feedback.repository");
const controller = new FeedbackController(new FeedbackRepository());
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

/**
 * ANNUAIRE
 */
router.get(
  "/users/:id/annuaires/:annuaire/feedbacks", checkTokenAccessMiddleware,
  controller.getFeedbackList
);
router.post(
  "/users/:id/annuaires/:annuaire/sendfeedback", checkTokenAccessMiddleware,
  controller.sendFeedback
);
router.get(
  "/users/:id/annuaires/:annuaire/getfeedback", checkTokenAccessMiddleware,
  controller.getFeedback
);
router.get(
  "/users/:id/annuaires/:annuaire/alreadygivefb", checkTokenAccessMiddleware,
  controller.isAleardyGiveFeedback
);
module.exports = router;
