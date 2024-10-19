const OrderRepository = require('../repositories/order.repository');

const OrderController = {
  async getOrder(req, res) {
    const { id } = req.params;
    try {
      const order = await OrderRepository.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Commande non trouvée' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
    }
  },
  async getOrderById(req, res) {
    const orderId = req.params.id;

    try {
      const order = await OrderRepository.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Commande non trouvée' });
      }
      res.json(order);
    } catch (error) {
      console.error('Erreur lors de la récupération de la commande:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
    }
  },
  async updateOrder(req, res) {
    const orderId = req.params.id;
    const { status } = req.body; // Supposons que le corps de la requête contient le nouveau statut

    try {
      const [updated] = await OrderRepository.updateStatus(orderId, status);
      if (updated) {
        const updatedOrder = await OrderRepository.findById(orderId);
        return res.json(updatedOrder);
      }
      return res.status(404).json({ message: 'Commande non trouvée pour mise à jour' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la commande:', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
    }
  },

  async createOrder(req, res) {
    const { user_id, total_amount, status, delivery_address, latitude, longitude } = req.body;
    try {
      const newOrder = await OrderRepository.create({ user_id, total_amount, status, delivery_address, latitude, longitude });
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la commande' });
    }
  },

  async updateOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await OrderRepository.updateStatus(id, status);
      res.status(200).json({ message: 'Statut de la commande mis à jour' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du statut' });
    }
  },

  async deleteOrder(req, res) {
    const { id } = req.params;
    try {
      await OrderRepository.delete(id);
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de la commande' });
    }
  },

  async getAllOrders(req, res) {
    try {
      const orders = await OrderRepository.findAll();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
    }
  }
};

module.exports = OrderController;
