const express = require('express');
const User = require('../models/User');
const { isAuth, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get('/', isAuth, isAdmin, async (req, res) => {
  try {
    // We select '-password' to exclude the hashed password from the data sent to the frontend
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// You can add routes for deleting or updating users here in the future
// For example: router.delete('/:id', isAuth, isAdmin, ...)

module.exports = router;