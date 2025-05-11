const db = require('../models/db');

// Fetch all landmarks
exports.getLandmarks = async (req, res) => {
    try {
        const [landmarks] = await db.query('SELECT * FROM landmarks');
        res.status(200).json({
            success: true,
            data: landmarks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Fetch visits data
exports.getVisits = async (req, res) => {
    try {
        const [visits] = await db.query('SELECT * FROM visits');
        res.status(200).json({
            success: true,
            data: visits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Fetch visits by landmark
exports.getVisitsByLandmark = async (req, res) => {
    const { landmarkId } = req.params;
    try {
        const [visits] = await db.query('SELECT * FROM visits WHERE landmark_id = ?', [landmarkId]);
        res.status(200).json({
            success: true,
            data: visits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};