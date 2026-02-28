const express = require('express');
const router = express.Router();
const { getExperience } = require('../controllers/experienceController');

router.get('/', getExperience);
module.exports = router;
