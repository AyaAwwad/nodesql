const Joi = require("joi");
const Volunteer = require("../models/Volunteer");



const VolunteerController = {
    getAllVolunteers: (req, res) => {
        Volunteer.getAll((err, volunteers) => {
            if(err) return res.status(500).json({message: "Error retrieving Volunteer"+err.message });
            res.json(volunteers);
        });
    },

    
    getVolunteerByID: (req,res) => {
        const {ID} = req.params;
        Volunteer.getByID(ID, (err, volunteers) => {
            if(err) return res.status(500).json({message: "Error finding Volunteer" + err.message });
            if(!volunteers) return res.status(404).json({message: "Volunteer not found"});
            res.json(volunteers);
        });
    },

    getVolunteerByGardenID: (req,res) => {
        const {garden_id} = req.params;
        Volunteer.getByGID(garden_id, (err, volunteers) => {
            if(err) return res.status(500).json({message: "Error finding Volunteer" + err.message });
            if(!volunteers) return res.status(404).json({message: "No Volunteer in this Garden found"});
            res.json(volunteers);
        });
    },

    createVolunteer: (req, res) => {
        const { error } = validateCreateVolunteer(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        Volunteer.create(req.body, (err, volunteers) => {
            if (err) return res.status(500).json({ message: "Error creating volunteer " + err.message });
            res.status(201).json(volunteers);
        });
    },

    updateVolunteer: (req, res) => {
        const { ID } = req.params;
        const { error } = validateUpdateVolunteer(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        Volunteer.update(ID, req.body, (err, volunteers) => {
            if (err) return res.status(500).json({ message: "Error updating volunteer: " + err.message });
            res.json(volunteers);
        });
    },

    deleteVolunteer: (req, res) => {
        const { ID } = req.params;
        Volunteer.delete(ID, (err, result) => {
            if (err) return res.status(500).json({ message: "Error deleting volunteer: " + err.message });
            res.json(result);
        });
    }
};

function validateCreateVolunteer(volunteers) {
    const schema = Joi.object({
        Name: Joi.string().trim().min(3).max(200).required(),
        PhoneNumber: Joi.number().min(0).required(),
        VolunteerDate: Joi.date().required(),
        garden_id: Joi.number().integer().required() 
    });
    return schema.validate(volunteers);
}

function validateUpdateVolunteer(volunteers) {
    const schema = Joi.object({
        Name: Joi.string().trim().min(3).max(200).required(),
        PhoneNumber: Joi.number().min(0).required(),
        VolunteerDate: Joi.date().required(),
        garden_id: Joi.number().integer().required()
    });
    return schema.validate(volunteers);
}

module.exports = VolunteerController;

