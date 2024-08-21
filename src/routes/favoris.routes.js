const router = require("express").Router();
const FavorisController = require("../controllers/favoris.controller");
const FavorisRepository = require("../repositories/favoris.repository");
const controller = new FavorisController(new FavorisRepository());
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

// FAVORIS
router.get("/users/:id/contact-favoris", checkTokenAccessMiddleware, controller.getAllContactFavoris);
router.get(
  "/users/:id/publication-favoris", checkTokenAccessMiddleware,
  controller.getAllPublicationFavoris
);
router.post("/users/:id/favoris", checkTokenAccessMiddleware, controller.saveItem); 
router.post("/users/:id/favoris/unsave", checkTokenAccessMiddleware, controller.unsaveItem); 
module.exports = router;
