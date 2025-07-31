// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const habitRoutes = require('./routes/habitRoutes');


const PORT = process.env.PORT || 5000;




// Middleware
app.use(cors());
app.use(express.json()); 
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/habits', habitRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('Task Manager API is running...');
});

// Connect to MongoDB and start server

  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

