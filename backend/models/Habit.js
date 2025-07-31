//habit.js
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  frequency: { type: String, default: 'daily' }, // e.g., 'daily', 'weekly'
  completions: [Date], // dates when habit was completed
  streak: { type: Number, default: 0 }, // current streak
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', habitSchema);
