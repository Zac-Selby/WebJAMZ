// userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/userController');

router.post('/register', registerUser);
router.post('/signup', registerUser); // Added signup route that uses the same registerUser function
router.post('/login', loginUser);

module.exports = router; 
