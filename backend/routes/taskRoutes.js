// taskRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask
} = require('../controller/taskController');

const { protect } = require('../middleware/authMiddleware');

// Apply protect to all routes
router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

// Complete task route
router.post('/:id/complete', protect, completeTask);

module.exports = router;
