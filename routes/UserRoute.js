const express = require('express');
const UserController = require('../controllers/UserController');
// const eventsController = require('../controllers/eventsController');
const signupValidation = require('../middleware/signupValidation');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

// POST /signup route with signupValidation middleware
router.post('/signup', signupValidation, UserController.signup);

// // POST /signup route
// router.post('/signup', UserController.signup);

// POST /login route
router.post('/login', UserController.login);

// Update profile route - Requires authentication
router.put('/profile/:id', authMiddleware, UserController.updateProfile);


// Delete profile route - Requires authentication and admin role
router.delete('/profile/:id', authMiddleware, UserController.deleteProfile);

// Search users route - Requires authentication and admin role
router.get('/search/users', authMiddleware, UserController.searchUsers);


module.exports = router;