const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router; 
// This code defines the user routes for registration and login in a Node.js application using Express.
// It imports the necessary modules, sets up the routes for user registration and login, and exports the router for use in the main server file.
// The `registerUser` and `loginUser` functions are imported from the user controller, which handle the logic for user registration and login respectively.
// The routes are defined using the POST method, allowing clients to send user data for registration and login operations.
// The router is then exported so it can be used in the main server file to handle requests related to user authentication.
// This modular approach helps keep the code organized and maintainable, separating route definitions from business logic
