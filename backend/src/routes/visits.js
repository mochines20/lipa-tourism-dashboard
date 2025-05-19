const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all visits
router.get('/', async (req, res) => {
    try {
        const [visits] = await db.query('SELECT * FROM visits');
        res.json(visits);
    } catch (error) {
        console.error('Error fetching visits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get visits by landmark
router.get('/landmark/:landmarkId', async (req, res) => {
    try {
        const [visits] = await db.query(
            'SELECT * FROM visits WHERE landmark_id = ?',
            [req.params.landmarkId]
        );
        res.json(visits);
    } catch (error) {
        console.error('Error fetching visits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get visitor trends
router.get('/trends', async (req, res) => {
    try {
        const [trends] = await db.query(`
            SELECT 
                DATE(visit_date) as date,
                COUNT(*) as visit_count
            FROM visits
            GROUP BY DATE(visit_date)
            ORDER BY date DESC
            LIMIT 30
        `);
        res.json(trends);
    } catch (error) {
        console.error('Error fetching visitor trends:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 