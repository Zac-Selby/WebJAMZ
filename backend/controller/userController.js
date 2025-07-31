// userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  console.log('registerUser called');
  console.log('Request body:', req.body);

  const { name, username, email, password } = req.body;
  // Use name if provided (from frontend), otherwise fall back to username
  const finalUsername = name || username;

  // Verify JWT_SECRET
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not set!');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  // Validate required fields
  if (!finalUsername || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username: finalUsername, email, password: hashedPassword });
    res.status(201).json({
      _id: newUser._id,
      name: newUser.username,
      email: newUser.email,
      token: generateToken(newUser._id)
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = { registerUser, loginUser };
