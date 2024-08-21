const express = require("express").Router();
const PermissionController = require("../controllers/permissionController");
const PermissionRepository = require("../repositories/permission.repository");
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");
// const checkPermission = require("../middlewares/checkPermission.middleware"); 
// const authMiddleware = require("../middlewares/auth.middleware");

const permissionRepository = new PermissionRepository();
const controller = new PermissionController(permissionRepository);

express.post("/permissions", checkTokenAccessMiddleware, controller.createPermission);
express.get("/permissions", checkTokenAccessMiddleware, controller.getAllPermissions);
express.get("/permissions/:id", checkTokenAccessMiddleware, controller.getPermissionById);
express.post("/permissions/:id/update", checkTokenAccessMiddleware, controller.updatePermission);
express.post("/permissions/:id/updateRolePermission", checkTokenAccessMiddleware, controller.updateRolePermission);
express.post("/permissions/:id/delete", checkTokenAccessMiddleware, controller.deletePermission);
express.get("/permissions/role/:roleId", checkTokenAccessMiddleware, controller.getPermissionsByRoleId);
express.post("/permissions/:permissionId/roles/:roleId", checkTokenAccessMiddleware, controller.deleteRolePermission);

module.exports = express;
