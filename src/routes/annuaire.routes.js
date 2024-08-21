const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const UserRepository = require("../repositories/user.repository");
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");
const userController = new UserController(new UserRepository());

router.get("/users/:id/annuaires", checkTokenAccessMiddleware, userController.getAllUserOrderByNote);

module.exports = router;
