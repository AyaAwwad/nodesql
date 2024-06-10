const Joi = require("joi");
const WeatherData = require("../models/WeatherData");

const weatherSchema = Joi.object({
    location: Joi.string().trim().min(3).max(100).required(),
    temperature: Joi.number().required(),
    humidity: Joi.number().required(),
    precipitation: Joi.number().required(),
    wind_speed: Joi.number().required(),
});

const weatherController = {
    getAllWeatherData: (req, res) => {
        WeatherData.getAll((err, data) => {
            if (err) return res.status(500).json({ message: "Error retrieving weather data: " + err.message });
            res.json(data);
        });
    },

    getWeatherDataById: (req, res) => {
        const { id } = req.params;
        WeatherData.getById(id, (err, data) => {
            if (err) return res.status(500).json({ message: "Error finding weather data: " + err.message });
            if (!data) return res.status(404).json({ message: "Weather data not found" });
            res.json(data);
        });
    },

    createWeatherData: (req, res) => {
        const { error } = weatherSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        WeatherData.create(req.body, (err, data) => {
            if (err) return res.status(500).json({ message: "Error creating weather data: " + err.message });
            res.status(201).json(data);
        });
    },

    updateWeatherData: (req, res) => {
        const { id } = req.params;
        const { error } = weatherSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        WeatherData.update(id, req.body, (err, data) => {
            if (err) return res.status(500).json({ message: "Error updating weather data: " + err.message });
            res.json(data);
        });
    },

    deleteWeatherData: (req, res) => {
        const { id } = req.params;
        WeatherData.delete(id, (err, result) => {
            if (err) return res.status(500).json({ message: "Error deleting weather data: " + err.message });
            res.json({ message: "Weather data deleted successfully" });
        });
    },
};

module.exports = weatherController;
