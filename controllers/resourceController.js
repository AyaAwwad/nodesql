const Joi = require("joi");
const Resource = require("../models/Resource");

const resourceSchema = Joi.object({
    name: Joi.string().trim().min(3).max(200).required(),       
    category: Joi.string().trim().min(3).max(100).required(),    
    description: Joi.string().trim().min(10).required(),         
    quantity: Joi.number().integer().required(),                     
    owner: Joi.string().trim().min(3).max(100).required(),       
                               
});

const resourceController = {
    getResources: (req, res) => {
        Resource.getAll((err, resources) => {
            if (err) return res.status(500).json({ message: "Error retrieving resources: " + err.message }); 
            res.json(resources);
        });
    },

    getResourceById: (req, res) => {
        const { id } = req.params;
        Resource.getById(id, (err, resource) => {
            if (err) return res.status(500).json({ message: "Error finding resource: " + err.message });
            if (!resource) return res.status(404).json({ message: "Resource not found" });
            res.json(resource);
        });
    },

    createResource: (req, res) => {
        const { error } = resourceSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        Resource.create(req.body, (err, resource) => {
            if (err) return res.status(500).json({ message: "Error creating resource: " + err.message });
            res.status(201).json(resource);
        });
    },

    updateResource: (req, res) => {
        const { id } = req.params;
        const { error } = resourceSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        Resource.update(id, req.body, (err, resource) => {
            if (err) return res.status(500).json({ message: "Error updating resource: " + err.message });
            if (!resource) return res.status(404).json({ message: "Resource not found" });
            res.json(resource);
        });
    },

    deleteResource: (req, res) => {
        const { id } = req.params;
        Resource.delete(id, (err, affectedRows) => {
            if (err) return res.status(500).json({ message: "Error deleting resource: " + err.message });
            if (affectedRows === 0) return res.status(404).json({ message: "Resource not found" });
            res.json({ message: "Resource deleted successfully" });
        });
    }
};

module.exports = resourceController;
