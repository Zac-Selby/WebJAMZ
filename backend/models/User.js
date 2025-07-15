const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a User model in a Node.js application.
// The schema includes fields for name, email, and password, with validation rules such as required fields, unique email, and minimum password length.
// The model is then exported for use in other parts of the application, such as user registration and login functionalities.
// The timestamps option automatically adds createdAt and updatedAt fields to the schema.
