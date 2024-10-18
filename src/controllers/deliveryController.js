const Delivery = require('../models/delivery.model');
const DriverLocation = require('../models/driverLocation.model');
const Order = require('../models/order.model');
const { calculateDistance } = require('../utils/distance');

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
  }
};

module.exports = DeliveryController;
