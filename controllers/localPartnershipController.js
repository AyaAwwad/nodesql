const Joi = require("joi");
const LocalPartner = require("../models/LocalPartner");

const localPartnerSchema = Joi.object({
    name: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(10).required(),
    type: Joi.string().trim().min(3).max(100).required(),
    location: Joi.string().trim().min(3).max(200).required(),
    contact_info: Joi.string().trim().min(3).max(100).required(),
    date_added: Joi.date().required(),
    offerings: Joi.string().trim().required()  // Adding offerings field to the schema
});

const localPartnershipController = {
    getLocalPartners: (req, res) => {
        LocalPartner.getAll((err, localPartners) => {
            if (err) return res.status(500).json({ message: "Error retrieving local partners: " + err.message });
            res.json(localPartners);
        });
    },

    getLocalPartnerById: (req, res) => {
        const { id } = req.params;
        LocalPartner.getById(id, (err, localPartner) => {
            if (err) return res.status(500).json({ message: "Error finding local partner: " + err.message });
            if (!localPartner) return res.status(404).json({ message: "Local partner not found" });
            res.json(localPartner);
        });
    },

    createLocalPartner: (req, res) => {
        const { error } = localPartnerSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        LocalPartner.create(req.body, (err, localPartner) => {
            if (err) return res.status(500).json({ message: "Error creating local partner: " + err.message });
            res.status(201).json(localPartner);
        });
    },

    updateLocalPartner: (req, res) => {
        const { id } = req.params;
        const { error } = localPartnerSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        LocalPartner.update(id, req.body, (err, localPartner) => {
            if (err) return res.status(500).json({ message: "Error updating local partner: " + err.message });
            res.json(localPartner);
        });
    },

    deleteLocalPartner: (req, res) => {
        const { id } = req.params;
        LocalPartner.delete(id, (err) => {
            if (err) return res.status(500).json({ message: "Error deleting local partner: " + err.message });
            res.status(204).end();
        });
    }
};

module.exports = localPartnershipController;
