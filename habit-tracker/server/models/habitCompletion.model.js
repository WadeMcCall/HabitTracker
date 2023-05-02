const mongoose = require('mongoose');

const habitCompletionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
  completionDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const HabitCompletion = mongoose.model('HabitCompletion', habitCompletionSchema);

module.exports = HabitCompletion;