const axios = require('axios');

const getWeatherData = async (location) => {
    const apiKey = process.env.WEATHER_API_KEY;
    console.log(`Using API key: ${apiKey}`); // Debug log
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        console.log(`Fetching weather data from URL: ${url}`); // Debug log
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`); // Debug log
        throw new Error('Error fetching weather data');
    }
};

module.exports = { getWeatherData };
