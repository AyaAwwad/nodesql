const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

const UserController = {};

UserController.signup = (req, res) => {
  const { username, email, password, location, interest, type } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Failed to create user. Please try again later.' });
    }

    const userData = { username, email, password: hashedPassword, location, interest, type };

    User.createUser(userData, (err, result) => {
      if (err) {
        console.error('Error signing up:', err);
        return res.status(500).json({ error: 'Failed to sign up. Please try again later.' });
      }
      console.log('User signed up successfully');
      return res.status(201).json({ message: 'User signed up successfully' });
    });
  });
};

function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

UserController.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  User.getUserByEmail(email, (err, user) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Failed to fetch user. Please try again later.' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    bcrypt.compare(password, user.password, (compareErr, result) => {
      if (compareErr) {
        console.error('Error comparing passwords:', compareErr);
        return res.status(500).json({ error: 'Failed to authenticate. Please try again later.' });
      }
      if (!result) {
        console.log('Password comparison failed for user:', email);
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET, // Use the secret key from the environment variables
        { expiresIn: '1h' }
      );

      return res.status(200).json({ message: 'Login successful', token, user });
    });
  });
};

UserController.updateProfile = (req, res) => {
  const userId = req.params.id;
  let { username, email, password, location, interest } = req.body;

  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ error: 'Failed to update profile. Please try again later.' });
      }
      updateProfileWithHashedPassword(userId, username, email, hashedPassword, location, interest, res);
    });
  } else {
    updateProfileWithHashedPassword(userId, username, email, password, location, interest, res);
  }
};

function updateProfileWithHashedPassword(userId, username, email, password, location, interest, res) {
  User.updateProfile(userId, { username, email, password, location, interest }, (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'Failed to update profile. Please try again later.' });
    }
    console.log('Profile updated successfully');
    return res.status(200).json({ message: 'Profile updated successfully' });
  });
}

UserController.deleteProfile = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  const userId = req.params.id;

  User.deleteProfile(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete profile. Please try again later.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Profile not found for deletion' });
    }

    return res.status(200).json({ message: 'Profile deleted successfully' });
  });
};

UserController.searchUsers = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  const { query } = req.query;

  User.searchUsers(query, (err, users) => {
    if (err) {
      console.error('Error searching users:', err);
      return res.status(500).json({ error: 'Failed to search users. Please try again later.' });
    }
    return res.status(200).json({ users });
  });
};

module.exports = UserController;
