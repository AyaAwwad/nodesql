const axios = require('axios');

const getSoilAnalysisData = async (lat, lon) => {
    const url = `https://rest.isric.org/soilgrids/v2.0/properties/query?lat=${lat}&lon=${lon}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching soil analysis data: ${error.message}`);
        throw new Error('Error fetching soil analysis data');
    }
};

module.exports = { getSoilAnalysisData };
