const PermissionRepository = require('../repositories/permission.repository');

class PermissionController {
 constructor(permissionRepository) {
    this.permissionRepository = permissionRepository;
 }

 createPermission= async (req, res) => {
    try {
       const permission = await this.permissionRepository.createPermission(req.body);
       res.status(201).json(permission);
    } catch (error) {
       res.status(500).send('Erreur lors de la création de la permission');
    }
 }

 getAllPermissions= async (req, res) =>  {
    try {
       const permissions = await this.permissionRepository.getAllPermissions();
       res.json(permissions);
    } catch (error) {
       res.status(500).send('Erreur lors de la récupération des permissions');
    }
 }

 getPermissionById= async (req, res) => {
    try {
       const permission = await this.permissionRepository.getPermissionById(req.params.id);
       if (permission) {
         res.json(permission);
       } else {
         res.status(404).send('Permission non trouvée');
       }
    } catch (error) {
       res.status(500).send('Erreur lors de la récupération de la permission');
    }
 }

 updatePermission= async (req, res) => {
    try {
       const updatedPermission = await this.permissionRepository.updatePermission(req.params.id, req.body);
       if (updatedPermission) {
         res.json(updatedPermission);
       } else {
         res.status(404).send('Permission non trouvée');
       }
    } catch (error) {
       res.status(500).send('Erreur lors de la mise à jour de la permission');
    }
 }
 updateRolePermission = async (req, res) => {
   try {
      const { id } = req.params; // Je suppose que cela correspond à permissionId
      const { roleId, isAssigned } = req.body;
      const updatedPermission = await this.permissionRepository.updateRolePermission(id, { roleId, isAssigned });
      if (updatedPermission) {
        res.json({
           success: true
        });
      } else {
        res.status(404).send('Permission non trouvée');
      }
   } catch (error) {
      console.log(error);
      res.status(500).send('Erreur lors de la mise à jour de la permission');
   }
}
getPermissionsByRoleId = async (req, res) => {
   try {
       const { roleId } = req.params;
       const permissions = await this.permissionRepository.getPermissionsByRoleId(roleId);
       res.json(permissions);
   } catch (error) {
       res.status(500).send('Erreur lors de la récupération des permissions par rôle');
   }
}
deleteRolePermission = async (req, res) => {
   try {
      const { permissionId, roleId } = req.params;
      const result = await this.permissionRepository.deleteRolePermission(permissionId, roleId);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send('Relation non trouvée');
      }
   } catch (error) {
      console.error('Erreur lors de la suppression de la permission du rôle:', error);
      res.status(500).send('Erreur lors de la suppression de la permission du rôle');
   }
  }
  

 deletePermission = async (req, res) => {
    try {
       const result = await this.permissionRepository.deletePermission(req.params.id);
       if (result) {
         res.status(204).send();
       } else {
         res.status(404).send('Permission non trouvée');
       }
    } catch (error) {
       res.status(500).send('Erreur lors de la suppression de la permission');
    }
 }
}

module.exports = PermissionController;
