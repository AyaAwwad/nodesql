const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a user model to fetch user details
require('dotenv').config(); // Load environment variables from .env file

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the secret key from the environment variables
    req.user = decoded;

    User.getUserById(req.user.userId, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Invalid token.' });
      }

      req.user.role = user.type;
      next();
    });
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
