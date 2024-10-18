// repositories/driver.repository.js
const Driver = require('../models/driver.model');

class DriverRepository {
  async findAll() {
    return await Driver.findAll();
  }

  async findById(id) {
    return await Driver.findByPk(id);
  }

  async create(driverData) {
    return await Driver.create(driverData);
  }

  async update(id, driverData) {
    const driver = await Driver.findByPk(id);
    if (driver) {
      return await driver.update(driverData);
    }
    return null;
  }

  async delete(id) {
    const driver = await Driver.findByPk(id);
    if (driver) {
      await driver.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new DriverRepository();
