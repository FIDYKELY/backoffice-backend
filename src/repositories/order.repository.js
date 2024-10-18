const Order = require('../models/Order');

const OrderRepository = {
  async findById(orderId) {
    return await Order.findByPk(orderId);
  }
};

module.exports = OrderRepository;
