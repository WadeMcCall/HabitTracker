const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User registration endpoint
router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User login endpoint
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({
      message: 'User logged in successfully',
      token: token,
      userId: user._id,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/verifyToken', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Token is valid' });
  } catch (err) {
    res.status(401).json({ error: 'Token is invalid or expired' });
  }
});

module.exports = router;
