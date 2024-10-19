const Delivery = require('../models/delivery.model');

const DeliveryRepository = {
  async findByOrderId(orderId) {
    return await Delivery.findOne({ where: { order_id: orderId } });
  },

  async create(deliveryData) {
    return await Delivery.create(deliveryData);
  },

  async updateStatus(deliveryId, status) {
    return await Delivery.update({ delivery_status: status }, {
      where: { id: deliveryId }
    });
  },

  async findAll() {
    return await Delivery.findAll();
  }
};

module.exports = DeliveryRepository;
