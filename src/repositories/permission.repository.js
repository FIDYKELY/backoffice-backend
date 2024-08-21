const Permission = require('../models/Permission');
const RolePermission = require('../models/RolePermission');

class PermissionRepository {
   async createPermission(data) {
      return await Permission.create(data);
   }

   async getAllPermissions() {
      return await Permission.findAll();
   }

   async getPermissionById(id) {
      return await Permission.findByPk(id);
   }

   async updatePermission(id, data) {
      const permission = await this.getPermissionById(id);
      if (permission) {
         return await permission.update(data);
      }
      throw new Error('Permission not found');
   }

   async updateRolePermission(id, data) {
      if (data.roleId) {
         const rolePermission = await RolePermission.findOne({
            where: {
               roleId: data.roleId,
               permissionId: id,
            },
         });
         console.log(data);
         if (data.isAssigned) {
            if (!rolePermission) {
               await RolePermission.create({
                  roleId: data.roleId,
                  permissionId: id,
               });
            }
         } else {
            if (rolePermission) {
               await rolePermission.destroy();
            }
         }
      } 
      return true;
   }
   async getPermissionsByRoleId(roleId) {
      const rolePermissions = await RolePermission.findAll({
          where: {
              roleId: roleId
          }
      });
      
      const permissionIds = rolePermissions.map(rp => rp.permissionId);
  
      const permissions = await Permission.findAll({
          where: {
              id: permissionIds
          }
      });
  
      return permissions;
  }
  async deleteRolePermission(permissionId, roleId) {
   const rolePermission = await RolePermission.findOne({
      where: {
        roleId: roleId,
        permissionId: permissionId,
      },
   });
  
   if (rolePermission) {
      await rolePermission.destroy();
      return true;
   }
  
   return false; 
  }
  

   async deletePermission(id) {
      const permission = await this.getPermissionById(id);
      if (permission) {
         return await permission.destroy();
      }
      throw new Error('Permission not found');
   }
}

module.exports = PermissionRepository;
