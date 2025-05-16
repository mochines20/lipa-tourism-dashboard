const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Get all landmarks
router.get('/landmarks', dataController.getAllLandmarks);

// Get landmark by ID
router.get('/landmarks/:id', dataController.getLandmarkById);

// Get visits data
router.get('/visits', dataController.getVisitsData);

// Add more GET endpoints for compliance
router.get('/visits/daily', dataController.getVisitsDaily);
router.get('/visits/weekly', dataController.getVisitsWeekly);
router.get('/visits/monthly', dataController.getVisitsMonthly);
router.get('/visits/yearly', dataController.getVisitsYearly);
router.get('/landmarks/category/:category', dataController.getLandmarksByCategory);

// Add a new visit
router.post('/visits', dataController.addVisit);

// Export the router
module.exports = router;