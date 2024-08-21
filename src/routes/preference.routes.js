const router = require("express").Router();
const PreferenceController = require("../controllers/preference.controller");
const PreferenceRepository = require("../repositories/preference.repository");
const controller = new PreferenceController(new PreferenceRepository());
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

// PREFERNCE
router.post(
  "/users/:id/preferences/change_preference", checkTokenAccessMiddleware,
  controller.changePreference
);
router.get("/users/:id/preferences", checkTokenAccessMiddleware, controller.getPreferenceSetting);

module.exports = router;
