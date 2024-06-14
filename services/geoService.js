const axios = require('axios');

const getCoordinates = async (location) => {
    const apiKey = process.env.GEOCODING_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.results.length === 0) {
            throw new Error('Location not found');
        }
        const { lat, lng } = response.data.results[0].geometry;
        return { lat, lng };
    } catch (error) {
        console.error(`Error fetching coordinates: ${error.message}`);
        throw new Error('Error fetching coordinates');
    }
};

module.exports = { getCoordinates };
