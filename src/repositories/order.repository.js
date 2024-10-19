const Order = require('../models/order.model');

const OrderRepository = {
  async findById(orderId) {
    return await Order.findByPk(orderId);
  },

  async create(orderData) {
    return await Order.create(orderData);
  },

  async updateStatus(orderId, status) {
    return await Order.update({ status }, {
      where: { id: orderId }
    });
  },

  async delete(orderId) {
    return await Order.destroy({
      where: { id: orderId }
    });
  },

  async findAll() {
    return await Order.findAll();
  }
};

module.exports = OrderRepository;
