const Joi = require("joi");
const Garden = require("../models/Garden.js");

const gardenController = {
    getAllGardens: (req, res) => {
        Garden.getAll((err, gardens) => {
            if (err) return res.status(500).json({ message: "Error retrieving gardens: " + err.message });
            res.json(gardens);
        });
    },

    getGardenById: (req, res) => {
        const { id } = req.params;
        Garden.getById(id, (err, garden) => {
            if (err) return res.status(500).json({ message: "Error finding garden: " + err.message });
            if (!garden) return res.status(404).json({ message: "Garden not found" });
            res.json(garden);
        });
    },

    createGarden: (req, res) => {
        const { error } = validateCreateGarden(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        Garden.create(req.body, (err, garden) => {
            if (err) return res.status(500).json({ message: "Error creating garden: " + err.message });
            res.status(201).json(garden);
        });
    },

    updateGarden: (req, res) => {
        const { id } = req.params;
        const { error } = validateUpdateGarden(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        Garden.update(id, req.body, (err, garden) => {
            if (err) return res.status(500).json({ message: "Error updating garden: " + err.message });
            res.json(garden);
        });
    },

    deleteGarden: (req, res) => {
        const { id } = req.params;
        Garden.delete(id, (err, result) => {
            if (err) return res.status(500).json({ message: "Error deleting garden: " + err.message });
            res.json(result);
        });
    }
};

function validateCreateGarden(garden) {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(200).required(),
        location: Joi.string().trim().min(3).max(200).required(),
        plotsAvailable: Joi.number().min(0).required(),
        conditions: Joi.string().trim().min(3).max(200).required()
    });
    return schema.validate(garden);
}

function validateUpdateGarden(garden) {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(200),
        location: Joi.string().trim().min(3).max(200),
        plotsAvailable: Joi.number().min(0),
        conditions: Joi.string().trim().min(3).max(200)
    });
    return schema.validate(garden);
}

module.exports = gardenController;
