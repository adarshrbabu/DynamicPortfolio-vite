const Experience = require('../models/Experience');

exports.getExperience = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    console.error('Fetch experience error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
