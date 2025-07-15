const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly'],
    default: 'Daily'
  },
  completions: {
    type: [Date], // Track each day user completed it
    default: []
  },
  streak: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
// This code defines a Mongoose schema for a Habit model in a Node.js application.
// The schema includes fields for the user ID, habit name, frequency (daily or weekly), completions (an array of dates when the habit was completed), and a streak counter.
// The user field is a reference to the User model, ensuring that each habit is associated with a specific user.
// The schema also includes timestamps to automatically manage created and updated dates.