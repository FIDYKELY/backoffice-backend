const router = require("express").Router();
const ContactController = require("../controllers/contact.controller");
const ContactRepository = require("../repositories/contact.repository");
const controller = new ContactController(new ContactRepository());
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

router.post("/contact_us", checkTokenAccessMiddleware, controller.contactUs); // ela be fotsin le test postman
router.get("/contacts", checkTokenAccessMiddleware, controller.getAllContact); 
 
module.exports = router;
