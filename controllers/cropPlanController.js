const Joi = require("joi");
const CropPlan = require("../models/CropPlan");

const cropPlanController = {
    getAllCropPlans: (req, res) => {
        CropPlan.getAll((err, cropPlans) => {
            if (err) return res.status(500).json({ message: "Error retrieving crop plans: " + err.message });
            res.json(cropPlans);
        });
    },

    getCropPlanById: (req, res) => {
        const { id } = req.params;
        CropPlan.getById(id, (err, cropPlan) => {
            if (err) return res.status(500).json({ message: "Error finding crop plan: " + err.message });
            if (!cropPlan) return res.status(404).json({ message: "Crop plan not found" });
            res.json(cropPlan);
        });
    },

    createCropPlan: (req, res) => {
        const { error } = validateCreateCropPlan(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        CropPlan.create(req.body, (err, cropPlan) => {
            if (err) return res.status(500).json({ message: "Error creating crop plan: " + err.message });
            res.status(201).json(cropPlan);
        });
    },

    updateCropPlan: (req, res) => {
        const { id } = req.params;
        const { error } = validateUpdateCropPlan(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        CropPlan.update(id, req.body, (err, cropPlan) => {
            if (err) return res.status(500).json({ message: "Error updating crop plan: " + err.message });
            res.json(cropPlan);
        });
    },

    deleteCropPlan: (req, res) => {
        const { id } = req.params;
        CropPlan.delete(id, (err, result) => {
            if (err) return res.status(500).json({ message: "Error deleting crop plan: " + err.message });
            res.json(result);
        });
    }
};

function validateCreateCropPlan(cropPlan) {
    const schema = Joi.object({
        cropType: Joi.string().trim().min(3).max(200).required(),
        plantingDate: Joi.date().required(),
        harvestDate: Joi.date().required(),
        notes: Joi.string().allow('').max(500)
    });
    return schema.validate(cropPlan);
}

function validateUpdateCropPlan(cropPlan) {
    const schema = Joi.object({
        cropType: Joi.string().trim().min(3).max(200),
        plantingDate: Joi.date(),
        harvestDate: Joi.date(),
        notes: Joi.string().allow('').max(500)
    });
    return schema.validate(cropPlan);
}

module.exports = cropPlanController;
