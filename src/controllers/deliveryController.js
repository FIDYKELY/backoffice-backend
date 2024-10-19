const Delivery = require('../models/delivery.model');
const DriverLocation = require('../models/driverLocation.model');
const Order = require('../models/order.model');
const { calculateDistance } = require('../utils/distance');
const Driver = require('../models/driver.model');

const DeliveryController = {
  async assignDriver(req, res) {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: 'orderId est requis' });
    }

    try {
      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Commande non trouvée' });
      }

      // Récupérer les conducteurs disponibles
      const drivers = await DriverLocation.findAll({
        include: {
          model: Driver,
          where: { status: 'available' }
        }
      });

      if (drivers.length === 0) {
        return res.status(404).json({ message: 'Aucun livreur disponible' });
      }

      // Trouver le conducteur le plus proche
      let closestDriver = null;
      let minDistance = Infinity;

      drivers.forEach(driver => {
        const distance = calculateDistance(order.latitude, order.longitude, driver.latitude, driver.longitude);
        if (distance < minDistance) {
          minDistance = distance;
          closestDriver = driver;
        }
      });

      if (closestDriver) {
        await Delivery.create({
          order_id: orderId,
          driver_id: closestDriver.driver_id
        });

        return res.status(200).json({
          message: 'Livreur assigné avec succès',
          driver: closestDriver
        });
      } else {
        return res.status(404).json({ message: 'Aucun livreur disponible' });
      }

    } catch (error) {
      console.error('Erreur lors de l\'assignation du livreur:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'assignation du livreur' });
    }
  },

  async updateDriverLocation(req, res) {
    const { driver_id, latitude, longitude } = req.body;

    if (!driver_id || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    try {
      const [updated] = await DriverLocation.update({ latitude, longitude }, {
        where: { driver_id }
      });

      if (updated) {
        res.status(200).json({ message: 'Position du livreur mise à jour' });
      } else {
        res.status(404).json({ message: 'Livreur non trouvé' });
      }
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
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des localisations' });
    }
  },

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

  async createDriverLocation(req, res) {
    const { driver_id, latitude, longitude } = req.body;

    if (!driver_id || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    try {
      const newLocation = await DriverLocation.create({ driver_id, latitude, longitude });
      res.status(201).json(newLocation);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la localisation' });
    }
  },

  async updateDriverLocation(req, res) {
    const { id } = req.params; // Obtenez l'ID de la localisation à partir des paramètres
    const { driver_id, latitude, longitude } = req.body;

    if (!driver_id || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

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
  },

  async updateDeliveryStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Le statut est requis' });
    }

    try {
      const delivery = await Delivery.findByPk(id);
      if (!delivery) {
        return res.status(404).json({ message: 'Livraison non trouvée' });
      }

      delivery.status = status; // Assurez-vous que votre modèle de livraison a un champ pour le statut
      await delivery.save(); // Mettez à jour la livraison
      res.status(200).json({ message: 'Statut de la livraison mis à jour' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la livraison:', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du statut de la livraison' });
    }
  },

  async getAllDeliveries(req, res) {
    try {
      const deliveries = await Delivery.findAll(); // Utilisez Delivery au lieu de DeliveryRepository
      res.status(200).json(deliveries);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des livraisons' });
    }
  },
};

module.exports = DeliveryController;
