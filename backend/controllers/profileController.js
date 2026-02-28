const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error('Fetch profile error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
