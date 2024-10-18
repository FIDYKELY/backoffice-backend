// controllers/driver.controller.js
const Driver = require('../models/driver.model');

// Récupérer tous les conducteurs
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    res.json(drivers);
  } catch (error) {
    console.error('Erreur lors de la récupération des conducteurs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer un conducteur par ID
exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).json({ message: 'Conducteur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du conducteur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Créer un nouveau conducteur
exports.createDriver = async (req, res) => {
  try {
    const { first_name, last_name, phone, email, vehicle_type } = req.body;
    const newDriver = await Driver.create({ first_name, last_name, phone, email, vehicle_type });
    res.status(201).json(newDriver);
  } catch (error) {
    console.error('Erreur lors de la création du conducteur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour un conducteur
exports.updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (driver) {
      const { first_name, last_name, phone, email, vehicle_type } = req.body;
      await driver.update({ first_name, last_name, phone, email, vehicle_type });
      res.json(driver);
    } else {
      res.status(404).json({ message: 'Conducteur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du conducteur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un conducteur
exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (driver) {
      await driver.destroy();
      res.status(204).send(); // Aucune réponse
    } else {
      res.status(404).json({ message: 'Conducteur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du conducteur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
