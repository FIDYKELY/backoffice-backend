const { calculateDistance } = require('./src/utils/distance');

// Exemples de coordonnées
const lat1 = -18.90834700; // Latitude de Paris
const lon1 = 47.52590100;  // Longitude de Paris
const lat2 = -18.81757200; // Latitude de Lyon
const lon2 = 47.55572700;  // Longitude de Lyon

const distance = calculateDistance(lat1, lon1, lat2, lon2);
console.log(`La distance entre Analakely et Ambohitrinimanga est de ${distance.toFixed(2)} km.`);