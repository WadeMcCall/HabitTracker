const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: String,
  frequency: { type: String, required: true, enum: ['daily', 'weekly', 'monthly', 'custom'] },
  daysOfWeek: [{
    type: String,
    enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  }],
  weekDay: {
    type: String,
    enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', null]
  },
  dayOfMonth: {
    type: Number,
    min: 1,
    max: 31,
    default: null
  },
  lastCompletion: Date,
  createdAt: { type: Date, default: Date.now },
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
