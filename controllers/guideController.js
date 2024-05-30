const Joi = require("joi");
const Guide = require("../models/Guide");

// Define Joi schema for guide validation
const guideSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).required(),
  content: Joi.string().trim().min(10).required(),
  author: Joi.string().trim().min(3).max(100).required(),
  publicationDate: Joi.date().required()
});

const guideController = {
  getAllGuides: (req, res) => {
    Guide.getAll((err, guides) => {
      if (err) return res.status(500).json({ message: "Error retrieving guides: " + err.message });
      res.json(guides);
    });
  },

  getGuideById: (req, res) => {
    const { id } = req.params;
    Guide.getById(id, (err, guide) => {
      if (err) return res.status(500).json({ message: "Error finding guide: " + err.message });
      if (!guide) return res.status(404).json({ message: "Guide not found" });
      res.json(guide);
    });
  },

  createGuide: (req, res) => {
    const { error, value } = guideSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    Guide.create(value, (err, results) => {
      if (err) return res.status(500).json({ message: "Error creating guide: " + err.message });
      res.status(201).json({ id: results.insertId, ...value });
    });
  },

  updateGuide: (req, res) => {
    const { id } = req.params;
    const { error, value } = guideSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    Guide.update(id, value, (err, results) => {
      if (err) return res.status(500).json({ message: "Error updating guide: " + err.message });
      res.json({ message: "Guide updated" });
    });
  },

  deleteGuide: (req, res) => {
    const { id } = req.params;
    Guide.delete(id, (err, results) => {
      if (err) return res.status(500).json({ message: "Error deleting guide: " + err.message });
      res.json({ message: "Guide deleted" });
    });
  }
};

module.exports = guideController;
