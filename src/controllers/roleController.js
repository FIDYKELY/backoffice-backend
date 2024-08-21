const RoleRepository = require('../repositories/role.repository');
// const { User } = require('../models/user.model');
const { Account } = require("../models/admin/account.model");


class RoleController {
 constructor(roleRepository) {
    this.roleRepository = roleRepository;
 }

 createRole = async (req, res) => {
    try {
       const role = await this.roleRepository.createRole(req.body);
       res.status(201).json(role);
    } catch (error) {
       res.status(500).send('Erreur lors de la création du rôle');
       console.log(error);
    }
 }

 getAllRoles = async (req, res) => {
   try {
     const roles = await this.roleRepository.getAllRoles();
     res.json(roles);
   } catch (error) {
     res.status(500).send('Erreur lors de la récupération des rôles');
     console.log(error);
   }
}

 getRoleById = async (req, res) => {
    try {
       const role = await this.roleRepository.getRoleById(req.params.id);
       if (role) {
         res.json(role);
       } else {
         res.status(404).send('Rôle non trouvé');
       }
    } catch (error) {
       res.status(500).send('Erreur lors de la récupération du rôle');
      console.log(error);
    }
 }

 updateRole = async (req, res) =>  {
    try {
       const updatedRole = await this.roleRepository.updateRole(req.params.id, req.body);
       if (updatedRole) {
         res.json(updatedRole);
       } else {
         res.status(404).send('Rôle non trouvé');
       }
    } catch (error) {
       res.status(500).send('Erreur lors de la mise à jour du rôle');
       console.log(error);
      }
 }

 deleteRole = async (req, res) =>  {
    try {
       const result = await this.roleRepository.deleteRole(req.params.id);
       if (result) {
         res.status(204).send();
       } else {
         res.status(404).send('Rôle non trouvé');
       }
    } catch (error) {
      console.log(error);
       res.status(500).send('Erreur lors de la suppression du rôle');
    }
 }
 assignRoleToUser = async (req, res) => {
   try {
       const { userId, roleId } = req.params;
       if (!userId || !roleId) {
           return res.status(400).send('Les identifiants de l\'utilisateur et du rôle sont requis.');
       }

       const updatedUser = await Account.update({ role_id: roleId }, {
           where: {
               id: userId
           }
       });

       if (updatedUser[0] === 1) {
           res.status(204).send(); // Réponse de succès
       } else {
           res.status(404).send('Utilisateur non trouvé');
       }
   } catch (error) {
       console.error(error);
       res.status(500).send('Erreur lors de l\'attribution du rôle à l\'utilisateur');
   }
}
}

module.exports = RoleController;