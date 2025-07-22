const Task = require('../models/Task');

// @desc    Get all tasks for logged-in user
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

// @desc    Create new task
const createTask = async (req, res) => {
  const { title, dueDate, priority } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  const task = await Task.create({
    user: req.user._id,
    title,
    dueDate,
    priority
  });

  res.status(201).json(task);
};

// @desc    Update a task
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || task.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Task not found or unauthorized' });
  }

  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// @desc    Delete a task
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || task.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Task not found or unauthorized' });
  }

  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task removed' });
};


module.exports = { getTasks, createTask, updateTask, deleteTask };
// This code defines a task controller for managing tasks in a Node.js application using Express and Mongoose.
// It includes functions to get all tasks for the logged-in user, create a new task, update an existing task, and delete a task.
// Each function interacts with the Task model to perform database operations and returns appropriate responses.