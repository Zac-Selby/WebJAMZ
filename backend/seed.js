require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const Habit = require('./models/habit');
const Reminder = require('./models/reminder');
const Streak = require('./models/streak');
const ProgressLog = require('./models/progressLog');

async function seedDB() {
  await mongoose.connect(process.env.MONGO_URI);

  // Clear all data first
  await User.deleteMany({});
  await Task.deleteMany({});
  await Habit.deleteMany({});
  await Reminder.deleteMany({});
  await Streak.deleteMany({});
  await ProgressLog.deleteMany({});

  // Create user
  const user = await User.create({
    username: 'adrian_dev',
    email: 'adrian@example.com',
    password: 'secure123'
  });

  // Create and store tasks
  const task1 = await Task.create({
    user: user._id,
    title: 'Write schemas',
    description: 'Finish all MongoDB schemas',
    dueDate: new Date(),
    isCompleted: false
  });

  const task2 = await Task.create({
    user: user._id,
    title: 'Test connection',
    description: 'Make sure server connects to MongoDB',
    dueDate: new Date(),
    isCompleted: true
  });

  // Create and store habit
  const habit1 = await Habit.create({
    user: user._id,
    name: 'Drink water',
    frequency: 'daily',
    progress: [new Date()]
  });

  // Create reminder
  const reminder1 = new Reminder({
    user: user._id,
    type: 'task',
    referenceId: task1._id,
    message: 'Don’t forget to finish your essay!',
    remindAt: new Date(Date.now() + 60 * 60 * 1000)
  });

  // Create streak
  const streak1 = new Streak({
    user: user._id,
    type: 'habit',
    referenceId: habit1._id,
    currentStreak: 3,
    lastCompletedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  });

  // Create progress logs
  const progressLog1 = new ProgressLog({
    user: user._id,
    type: 'task',
    referenceId: task1._id,
    date: new Date(),
    status: 'completed'
  });

  const progressLog2 = new ProgressLog({
    user: user._id,
    type: 'habit',
    referenceId: habit1._id,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'missed'
  });

  // Save new documents
  await Promise.all([
    reminder1.save(),
    streak1.save(),
    progressLog1.save(),
    progressLog2.save()
  ]);
  referenceId: task1._id // works because task1 is defined
  referenceId: habit1._id


  console.log('✅ Seeded database!');
  mongoose.connection.close();
}

seedDB();
