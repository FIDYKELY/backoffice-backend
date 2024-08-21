const router = require("express").Router();
const PageViewsController = require("../controllers/pageviews.controller");
const PageViewsRepository = require("../repositories/pageviews.repository");
const controller = new PageViewsController(new PageViewsRepository());
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

router.post("/increment", checkTokenAccessMiddleware, controller.incrementView);
router.get("/getMostViewed", checkTokenAccessMiddleware, controller.GetMostViewed);
 
module.exports = router;
