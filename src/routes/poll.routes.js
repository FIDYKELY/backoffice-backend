const router = require("express").Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'stockage/images/vote/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const PollController = require("../controllers/poll.controller");
const PollRepository = require("../repositories/poll.repository");
const controller = new PollController(new PollRepository());
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

router.post("/users/:id/polls/:poll/delete", checkTokenAccessMiddleware, controller.deletePoll);

router.get("/polls", checkTokenAccessMiddleware, controller.getAllPoll);
router.get("/polls/:poll", checkTokenAccessMiddleware, controller.getOnePoll);
router.post("/users/:id/polls", checkTokenAccessMiddleware, upload.array("files"), controller.addPoll);
router.get("/users/:id/polls", checkTokenAccessMiddleware, controller.getPoll);
router.get("/polls_paginate", checkTokenAccessMiddleware, controller.getPollPaginaton);
router.get("/polls/statistic/:etat", checkTokenAccessMiddleware, controller.getStatisticPoll);

module.exports = router;
