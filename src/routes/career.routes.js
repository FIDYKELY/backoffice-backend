const router = require("express").Router();
const CareerController = require("../controllers/career.controller");
const CareerRepository = require("../repositories/career.repository");

const careerController = new CareerController(new CareerRepository());

const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

/**
 * CAREER
 */
router.get("/users/:id/careers", checkTokenAccessMiddleware, careerController.getAllLevel); 
router.post("/users/:id/careers", checkTokenAccessMiddleware, careerController.addLevel); 
router.post("/users/:id/careers/:career", checkTokenAccessMiddleware, careerController.updateLevel); 
router.post("/users/:id/careers/:career/delete", checkTokenAccessMiddleware, careerController.deleteLevel); 

/**
 * ANNUAIRE
 */
router.get("/annuaires/:id/careers", checkTokenAccessMiddleware, careerController.getAllLevel); //Test de haingo vita

module.exports = router;
