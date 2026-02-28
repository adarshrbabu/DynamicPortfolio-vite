const Project = require('../models/Project');

// @route   GET /api/projects
// @desc    Get all portfolio projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    console.error('Fetch projects error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @route   POST /api/projects
// @desc    Add a new project (Could be protected)
exports.addProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    console.error('Add project error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};
