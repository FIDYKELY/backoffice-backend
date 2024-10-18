const Delivery = require('../models/delivery.model');
const DriverLocation = require('../models/driverLocation.model');
const Order = require('../models/order.model');
const { calculateDistance } = require('../utils/distance');
const Driver = require('../models/driver.model');


const DeliveryController = {
  async assignDriver(req, res) {
    const { orderId } = req.body;

    try {
      // Obtenir les informations de la commande
      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Commande non trouvée' });
      }

      // Obtenir les positions des livreurs disponibles
      const drivers = await DriverLocation.findAll({
        include: {
          model: Driver,
          where: { status: 'available' }
        }
      });

      let closestDriver = null;
      let minDistance = Infinity;

      drivers.forEach(driver => {
        const distance = calculateDistance(order.latitude, order.longitude, driver.latitude, driver.longitude);
        if (distance < minDistance) {
          minDistance = distance;
          closestDriver = driver;
        }
      });

      // Assigner le livreur le plus proche à la commande
      if (closestDriver) {
        await Delivery.create({
          order_id: orderId,
          driver_id: closestDriver.driver_id
        });

        res.status(200).json({ message: 'Livreur assigné avec succès', driver: closestDriver });
      } else {
        res.status(404).json({ message: 'Aucun livreur disponible' });
      }

    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de l\'assignation du livreur' });
    }
  },

  async updateDriverLocation(req, res) {
    const { driver_id, latitude, longitude } = req.body;

    try {
      await DriverLocation.update({ latitude, longitude }, {
        where: { driver_id }
      });

      res.status(200).json({ message: 'Position du livreur mise à jour' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la position' });
    }
  },
  async getDriverLocations(req, res) {
    try {
      const locations = await DriverLocation.findAll({
        include: {
          model: Driver, // Inclure les détails du conducteur
        }
      });
      res.status(200).json(locations);
    } catch (error) {
      console.error(error); // Ajoutez cette ligne pour voir l'erreur dans la console
      res.status(500).json({ error: 'Erreur lors de la récupération des localisations' });
    }
  },

  // Récupérer une localisation spécifique par ID
  async getDriverLocationById(req, res) {
    const { id } = req.params;
    try {
      const location = await DriverLocation.findByPk(id, {
        include: {
          model: Driver,
        }
      });
      if (!location) {
        return res.status(404).json({ message: 'Localisation non trouvée' });
      }
      res.status(200).json(location);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération de la localisation' });
    }
  },

  // Créer une nouvelle localisation
  async createDriverLocation(req, res) {
    const { driver_id, latitude, longitude } = req.body;
    try {
      const newLocation = await DriverLocation.create({ driver_id, latitude, longitude });
      res.status(201).json(newLocation);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la localisation' });
    }
  },

  // Mettre à jour une localisation existante
  async updateDriverLocation(req, res) {
    const { id } = req.params; // Obtenez l'ID de la localisation à partir des paramètres
    const { driver_id, latitude, longitude } = req.body;

    try {
      const [updated] = await DriverLocation.update(
        { driver_id, latitude, longitude },
        { where: { id } }
      );

      if (updated) {
        const updatedLocation = await DriverLocation.findByPk(id);
        res.status(200).json(updatedLocation);
      } else {
        res.status(404).json({ message: 'Localisation non trouvée' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la localisation' });
    }
  },

  // Supprimer une localisation
  async deleteDriverLocation(req, res) {
    const { id } = req.params;
    try {
      const deleted = await DriverLocation.destroy({
        where: { id }
      });
      if (deleted) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ message: 'Localisation non trouvée' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de la localisation' });
    }
  }
};

module.exports = DeliveryController;

