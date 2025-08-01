//taskController.js
const Task = require('../models/Task');

// @desc    Get all tasks for logged-in user
const getTasks = async (req, res) => {
  try {
    console.log('getTasks called, user:', req.user); // See if user info is available
    const tasks = await Task.find({ user: req.user._id });
    console.log('retrieved tasks:', tasks); // Check what tasks come back
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: 'Server error getting tasks' });
  }
};

// @desc    Create new task
const createTask = async (req, res) => {
  const { title, dueDate, priority } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  try {
    const task = await Task.create({
      user: req.user._id,
      title,
      dueDate,
      priority
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error creating task' });
  }
};

// @desc    Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id, 
      { 
        ...req.body,
        updatedAt: new Date()
      }, 
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error updating task' });
  }
};

// @desc    Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error deleting task' });
  }
};

// @desc    Mark a task as complete
const completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    if (task.isComplete) {
      return res.status(400).json({ message: 'Task is already completed' });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id, 
      { 
        isComplete: true,
        updatedAt: new Date()
      }, 
      { new: true }
    );
    
    res.json(updated);
  } catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({ message: 'Server error completing task' });
  }
};


module.exports = { getTasks, createTask, updateTask, deleteTask, completeTask };
