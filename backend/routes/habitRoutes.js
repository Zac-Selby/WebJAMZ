const express = require('express');
const router = express.Router();
const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit
} = require('../controller/habitController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getHabits)
  .post(protect, createHabit);

router.route('/:id')
  .put(protect, updateHabit)
  .delete(protect, deleteHabit);

router.post('/:id/complete', protect, completeHabit);
// The `completeHabit` function is called when a user marks a habit as completed.
// This route allows users to complete a habit, which updates the habit's completion status and streak

module.exports = router;

// This code defines the routes for managing habits in a Node.js application using Express.
// It imports the necessary modules, sets up the routes for getting all habits, creating a new habit, updating an existing habit, and deleting a habit.
// The `protect` middleware is used to ensure that only authenticated users can access these routes.

