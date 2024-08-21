const router = require("express").Router();
const SurveyController = require("../controllers/survey.controller");
const SurveyRepository = require("../repositories/survey.repository");
const controller = new SurveyController(new SurveyRepository());
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

router.get("/users/:id/surveys", checkTokenAccessMiddleware, controller.getSurvey); 
router.post("/users/:id/surveys", checkTokenAccessMiddleware, controller.addSurvey); 
router.post("/users/:id/surveys/:survey/delete", checkTokenAccessMiddleware, controller.deleteSurvey); 
router.get("/surveys", checkTokenAccessMiddleware, controller.getAllSurvey);  
router.get("/surveys/:survey", checkTokenAccessMiddleware, controller.getOneSurvey); 
router.get("/surveys_paginate", checkTokenAccessMiddleware, controller.getSurveyPaginate);
router.get("/surveys/statistic/:etat", checkTokenAccessMiddleware, controller.getStatisticSurvey);
module.exports = router;
