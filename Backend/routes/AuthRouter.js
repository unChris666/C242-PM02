const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getMyUser } = require('../controllers/AuthController');
const{ authMiddleware } = require('../middleware/UserMiddleware');

// Register User
router.post('/register', registerUser); //nama, email, password, confirmPassword

// Login User
router.post('/login', loginUser); //email, password

// Logout User
router.post('/logout', authMiddleware, logoutUser); 

// Get My User
router.get('/me', authMiddleware, getMyUser);

module.exports = router;