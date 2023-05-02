const express = require('express');
const Habit = require('../models/habit.model');
const HabitCompletion = require('../models/habitCompletion.model');
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

router.get('/habitCompletions/:habitId', authenticateJWT, async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const habitCompletions = await HabitCompletion.find({ habitId, userId: req.userId });
    res.status(200).json(habitCompletions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:habitId', authenticateJWT, async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const habit = await Habit.findOne({ _id: habitId, userId: req.userId });

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    res.status(200).json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/:habitId', authenticateJWT, async (req, res) => {
  try {
    const { habitId } = req.params;
    const { userId, name, description, daysOfWeek } = req.body;

    const habit = await Habit.findOne({ _id: habitId, userId });

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    habit.name = name || habit.name;
    habit.description = description || habit.description;
    habit.daysOfWeek = daysOfWeek || habit.daysOfWeek;

    await habit.save();

    res.status(200).json(habit);
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

router.post('/:habitId/complete', authenticateJWT, async (req, res) => {
  try {
    const { habitId } = req.params;
    const userId = req.userId; 

    // Check if the habit exists
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    
    // Check if the habit belongs to the current user
    if (habit.userId.toString() != userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Create a new habit completion
    const completionDate = new Date();
    completionDate.setHours(0, 0, 0, 0);

    const habitCompletion = new HabitCompletion({
      userId,
      habitId,
      completionDate,
    });

    habit.lastCompletion = new Date();
    await habit.save();
    await habitCompletion.save();

    res.status(201).json({ message: 'Habit completed', habitCompletion });
  } catch (error) {
    console.error('Error completing habit:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
