const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all landmarks
router.get('/', async (req, res) => {
    try {
        const [landmarks] = await db.query('SELECT * FROM landmarks ORDER BY created_at DESC');
        res.json(landmarks);
    } catch (error) {
        console.error('Error fetching landmarks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get landmark by ID
router.get('/:id', async (req, res) => {
    try {
        const [landmark] = await db.query('SELECT * FROM landmarks WHERE id = ?', [req.params.id]);
        if (landmark.length === 0) {
            return res.status(404).json({ error: 'Landmark not found' });
        }
        res.json(landmark[0]);
    } catch (error) {
        console.error('Error fetching landmark:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get landmarks by location
router.get('/location/:location', async (req, res) => {
    try {
        const [landmarks] = await db.query(
            'SELECT * FROM landmarks WHERE location LIKE ?',
            [`%${req.params.location}%`]
        );
        res.json(landmarks);
    } catch (error) {
        console.error('Error fetching landmarks by location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get landmarks by category
router.get('/category/:category', async (req, res) => {
    try {
        const [landmarks] = await db.query(
            'SELECT * FROM landmarks WHERE category = ?',
            [req.params.category]
        );
        res.json(landmarks);
    } catch (error) {
        console.error('Error fetching landmarks by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get landmarks with visit count
router.get('/stats/visits', async (req, res) => {
    try {
        const [stats] = await db.query(`
            SELECT 
                l.*,
                COUNT(v.id) as total_visits,
                SUM(v.visitor_count) as total_visitors
            FROM landmarks l
            LEFT JOIN visits v ON l.id = v.landmark_id
            GROUP BY l.id
            ORDER BY total_visitors DESC
        `);
        res.json(stats);
    } catch (error) {
        console.error('Error fetching landmark stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get landmarks with recent visits
router.get('/stats/recent', async (req, res) => {
    try {
        const [stats] = await db.query(`
            SELECT 
                l.*,
                v.visit_date,
                v.visitor_count
            FROM landmarks l
            LEFT JOIN visits v ON l.id = v.landmark_id
            WHERE v.visit_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            ORDER BY v.visit_date DESC
        `);
        res.json(stats);
    } catch (error) {
        console.error('Error fetching recent visit stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 