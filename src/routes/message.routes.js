const router = require("express").Router();
const MessageController = require("../controllers/message.controller");
const multer = require("multer");
const MessageRepository = require("../repositories/message.repository");
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });
const controller = new MessageController(new MessageRepository());
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

/**
 * MESSAGE
 */
router.get("/users/:id/messages/:receiver", checkTokenAccessMiddleware, controller.getMessage);  
router.post(
  "/users/:id/messages/:receiver/send", checkTokenAccessMiddleware,   
  upload.any(), checkTokenAccessMiddleware,
  controller.sendMessage
);
router.post(
  "/users/:id/messages/:friend/set-as-seen", checkTokenAccessMiddleware, // Mila averina jerena kely le boolean
  controller.setAllMessageAsSeen
);
router.get("/users/:id/message/not-seen-number", checkTokenAccessMiddleware, controller.getNotSeenNumber); 
module.exports = router;
