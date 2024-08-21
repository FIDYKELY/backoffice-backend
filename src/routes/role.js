const express = require("express").Router();
const RoleController = require("../controllers/roleController");
const RoleRepository = require("../repositories/role.repository");
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

// Instanciez RoleRepository et RoleController
const roleRepository = new RoleRepository();
const controller = new RoleController(new RoleRepository());

// Utilisez controller pour définir vos routes
express.post("/roles", checkTokenAccessMiddleware, controller.createRole);
express.get("/roles", checkTokenAccessMiddleware, controller.getAllRoles);
express.get("/roles/:id", checkTokenAccessMiddleware, controller.getRoleById);
express.post("/roles/:id/update", checkTokenAccessMiddleware, controller.updateRole);
express.post("/roles/:id/delete", checkTokenAccessMiddleware, controller.deleteRole);
express.post("/users/:userId/assign-role/:roleId", checkTokenAccessMiddleware, controller.assignRoleToUser);

module.exports = express;