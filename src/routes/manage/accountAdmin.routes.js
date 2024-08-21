const router = require("express").Router();
const ManageAccountController = require("../../controllers/admin/account.controller");
const AdminLoginController = require("../../controllers/admin/login.controller");
const AdminRegisterController = require("../../controllers/admin/register.controller");
const ManageAccountRepository = require("../../repositories/admin/account.repository");
const AdminLoginRepository = require("../../repositories/admin/login.repository");
const AdminRegisterRepository = require("../../repositories/admin/register.repository");
const PermissionRepository = require("../../repositories/permission.repository");

const accountController = new ManageAccountController(new ManageAccountRepository());
const registerController = new AdminRegisterController(new AdminRegisterRepository());
const loginController = new AdminLoginController(new AdminLoginRepository(), new PermissionRepository());

router.get("/admin/:admin/users", accountController.getAllUser);
router.post("/admin/:admin/users/:user/delete", accountController.deleteUser);
router.post(
  "/admin/:admin/accounts/:account/delete",
  accountController.deleteAccount
);
router.post(
  "/admin/:admin/accounts/:account/update",
  accountController.updateAccount
);
router.post(
  "/admin/:admin/accounts/:account/change-password",
  accountController.updatePassword
);
router.get("/admin/:admin/accounts", accountController.getAllAdmin);
router.get("/admin/:admin/accounts/:account", accountController.getOneAccount);
// ADMIN
router.post("/admin/register", registerController.register);
router.post("/admin/login", loginController.login);
module.exports = router;
