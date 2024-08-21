const router = require("express").Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'stockage/images/avatar/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
const UserController = require("../controllers/user.controller");
const UserRepository = require("../repositories/user.repository");
const controller = new UserController(new UserRepository());
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

router.post("/search", checkTokenAccessMiddleware, controller.searchUser); 
router.post("/users/:user/about/update", checkTokenAccessMiddleware, controller.editUserAbout); 
router.post("/users/:user/skills/update", checkTokenAccessMiddleware, controller.editUserSkill);  
router.get("/users", checkTokenAccessMiddleware, controller.getAllUser);  
router.get("/users/:id", checkTokenAccessMiddleware, controller.getOneUserById); 
router.post("/users/:id/update", checkTokenAccessMiddleware, controller.updateOneUser); 
router.post(
  "/users/:id/profils/avatar", checkTokenAccessMiddleware,
  upload.any(),
  controller.setAvatar
); 
router.get("/users/:id/avatar", checkTokenAccessMiddleware, controller.getAvatar); 
router.get("/users/:id/publications", checkTokenAccessMiddleware, controller.getAllUserPublication); // Total modif Haingo fini

router.get("/Liste_Users", controller.getAllUser);  
module.exports = router;
router.post("/users_modif/:id/update", checkTokenAccessMiddleware,controller.updateOneUser); 
router.post("/users/:user/delete", checkTokenAccessMiddleware,controller.deleteUser); 
router.get("/users/statistic/:etat", checkTokenAccessMiddleware, controller.getStatisticUser);

router.get("/users_paginate", checkTokenAccessMiddleware, controller.getUserPagination);
router.get("/demographic_data", checkTokenAccessMiddleware , controller.getAllDemographicData);
