const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Habit = require('./models/habit.model');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');

const authenticateJWT = require('./middleware/auth.middleware');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB at ${process.env.MONGO_URI}`);
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// User registration endpoint
app.post('/api/users/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User login endpoint
app.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'User logged in successfully',
      token: token,
      userId: user._id,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/habits', authenticateJWT, async (req, res) => {
  try {
    const newHabit = new Habit(req.body);
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/habits', authenticateJWT, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });

    console.log('req.userId:', req.userId);
    console.log('Habits found:', habits);
    
    res.status(200).json(habits);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});