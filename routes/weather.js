const express = require('express');
const router = express.Router();
const { getWeatherData } = require('../services/weatherService');

router.get('/:location', async (req, res) => {
    const location = req.params.location;
    console.log(`Received request for weather data for location: ${location}`); // Debug log
    try {
        const weatherData = await getWeatherData(location);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
