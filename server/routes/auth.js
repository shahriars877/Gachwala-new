const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password: await bcrypt.hash(password, 10) });
    await user.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;