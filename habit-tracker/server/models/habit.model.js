const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: String,
  frequency: { type: String, required: true, enum: ['daily', 'weekly', 'monthly'] },
  createdAt: { type: Date, default: Date.now },
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;