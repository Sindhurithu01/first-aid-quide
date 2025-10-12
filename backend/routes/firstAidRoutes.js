const express = require("express");
const router = express.Router();
const FirstAid = require("../models/firstAidModel");

// Get all topics
router.get("/topics", async (req, res) => {
  try {
    const topics = await FirstAid.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single topic by ID
router.get("/:id", async (req, res) => {
  try {
    const topic = await FirstAid.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new topic (optional - for admin)
router.post("/", async (req, res) => {
  const newTopic = new FirstAid({
    title: req.body.title,
    description: req.body.description,
    steps: req.body.steps,
    images: req.body.images,
  });

  try {
    const savedTopic = await newTopic.save();
    res.status(201).json(savedTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
