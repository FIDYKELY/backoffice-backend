const { Role } = require('../models/Role');
// const { User } = require('../models/user.model');
const RolePermission = require('../models/RolePermission');
const { Account } = require("../models/admin/account.model");


class RoleRepository {
 async createRole(data) {
    return await Role.create(data);
 }

 async getAllRoles() {
    return await Role.findAll();
 }

 async getRoleById(id) {
    return await Role.findByPk(id);
 }

 async updateRole(id, data) {
    const role = await this.getRoleById(id);
    if (role) {
      return await role.update(data);
    }
    throw new Error('Role not found');
 }

 async deleteRole(id) {
    await RolePermission.destroy({
      where: {
         role_id: id
      }
    });
    const role = await this.getRoleById(id);
    if (role) {
      return await role.destroy();
    }
    throw new Error('Role not found');
 }

 async assignRoleToUser(userId, roleId) {
   try {
       // Récupérer l'utilisateur et le rôle
       const user = await Account.findByPk(userId);
       const role = await Role.findByPk(roleId);

       if (!user || !role) {
           throw new Error('Utilisateur ou rôle non trouvé');
       }

       // Mettre à jour le rôle de l'utilisateur
       user.role_id = roleId;
       await Account.save();

       return true; // Succès
   } catch (error) {
       throw new Error('Erreur lors de l\'attribution du rôle à l\'utilisateur');
   }
}
}

module.exports = RoleRepository;
