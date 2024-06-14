const express = require('express');
const router = express.Router();
const { getCoordinates } = require('../services/geoService');
const { getSoilAnalysisData } = require('../services/soilService');

router.get('/:location', async (req, res) => {
    const { location } = req.params;
    try {
        const { lat, lng } = await getCoordinates(location);
        const soilData = await getSoilAnalysisData(lat, lng);
        res.json(soilData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
