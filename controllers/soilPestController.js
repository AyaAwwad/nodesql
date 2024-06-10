const Joi = require("joi");
const SoilPestManagement = require("../models/SoilPestManagement");

const soilPestSchema = Joi.object({
    soil_type: Joi.string().trim().min(3).max(100).required(),
    pest_name: Joi.string().trim().min(3).max(100).required(),
    pest_control_method: Joi.string().trim().min(10).required(),
    additional_notes: Joi.string().trim().allow('', null),
});

const soilPestController = {
    getAllSoilPestData: (req, res) => {
        SoilPestManagement.getAll((err, data) => {
            if (err) return res.status(500).json({ message: "Error retrieving soil and pest data: " + err.message });
            res.json(data);
        });
    },

    getSoilPestDataById: (req, res) => {
        const { id } = req.params;
        SoilPestManagement.getById(id, (err, data) => {
            if (err) return res.status(500).json({ message: "Error finding soil and pest data: " + err.message });
            if (!data) return res.status(404).json({ message: "Soil and pest data not found" });
            res.json(data);
        });
    },

    createSoilPestData: (req, res) => {
        const { error } = soilPestSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        SoilPestManagement.create(req.body, (err, data) => {
            if (err) return res.status(500).json({ message: "Error creating soil and pest data: " + err.message });
            res.status(201).json(data);
        });
    },

    updateSoilPestData: (req, res) => {
        const { id } = req.params;
        const { error } = soilPestSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        SoilPestManagement.update(id, req.body, (err, data) => {
            if (err) return res.status(500).json({ message: "Error updating soil and pest data: " + err.message });
            res.json(data);
        });
    },

    deleteSoilPestData: (req, res) => {
        const { id } = req.params;
        SoilPestManagement.delete(id, (err, result) => {
            if (err) return res.status(500).json({ message: "Error deleting soil and pest data: " + err.message });
            res.json({ message: "Soil and pest data deleted successfully" });
        });
    },
};

module.exports = soilPestController;
