//streak.js
const mongoose = require('mongoose');

const streakSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['task', 'habit'], required: true },
  referenceId: { type: mongoose.Schema.Types.ObjectId, required: true }, // taskId or habitId
  currentStreak: { type: Number, default: 0 },
  lastCompletedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Streak', streakSchema);
