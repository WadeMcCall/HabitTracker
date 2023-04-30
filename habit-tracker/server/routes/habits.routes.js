const express = require('express');
const Habit = require('../models/habit.model');
const authenticateJWT = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {
  try {
    const newHabit = new Habit(req.body);
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });

    res.status(200).json(habits);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, userId: req.userId });

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    await Habit.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Habit deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
