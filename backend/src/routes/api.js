const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Get all landmarks
router.get('/landmarks', dataController.getAllLandmarks);

// Get landmark by ID
router.get('/landmarks/:id', dataController.getLandmarkById);

// Get visits data
router.get('/visits', dataController.getVisitsData);

// Add a new visit
router.post('/visits', dataController.addVisit);

// Export the router
module.exports = router;