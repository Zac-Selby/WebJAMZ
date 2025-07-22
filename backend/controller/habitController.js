const Habit = require('../models/Habit');

// Get all habits
const getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });
  res.json(habits);
};

// Create a habit
const createHabit = async (req, res) => {
  const { name, frequency } = req.body;

  if (!name) return res.status(400).json({ message: 'Habit name is required' });

  const habit = await Habit.create({
    user: req.user._id,
    name,
    frequency
  });

  res.status(201).json(habit);
};

// Update a habit
const updateHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit || habit.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Habit not found or unauthorized' });
  }

  const updated = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete a habit
const deleteHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit || habit.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Habit not found or unauthorized' });
  }

  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: 'Habit removed' });
};


// This code defines a habit controller for managing habits in a Node.js application using Express and Mongoose.
// It includes functions to get all habits for the logged-in user, create a new habit, update an existing habit, and delete a habit.
// Each function interacts with the Habit model to perform database operations and returns appropriate responses.


const completeHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit || habit.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Habit not found or unauthorized' });
  }

  const today = new Date().toDateString();

  // Check if already marked complete for today
  const alreadyCompleted = habit.completions.some(
    date => new Date(date).toDateString() === today
  );

  if (alreadyCompleted) {
    return res.status(400).json({ message: 'Habit already marked complete for today' });
  }

  // Add today’s completion
  habit.completions.push(new Date());

  // Handle streak logic
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const didYesterday = habit.completions.some(
    date => new Date(date).toDateString() === yesterday.toDateString()
  );

  if (didYesterday || habit.streak === 0) {
    habit.streak += 1;
  } else {
    habit.streak = 1; // restart streak
  }

  await habit.save();

  res.json({
    message: 'Habit marked complete for today',
    streak: habit.streak,
    completions: habit.completions
  });
};
// This function allows users to mark a habit as completed for the day.
// It checks if the habit exists and belongs to the user, then adds today's date to the completions array.
// It also manages the streak logic, incrementing the streak if the habit was completed yesterday or resetting it if not.

module.exports = { getHabits, createHabit, updateHabit, deleteHabit, completeHabit };