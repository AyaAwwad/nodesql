const jwt = require('jsonwebtoken');
const login = require('./login');

const TokenVerify = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            login.warn('Failed token verification', err);
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        login.warn(`Access attempt by user ${req.userId}`);
        return res.status(403).json({ message: 'Requires admin role' });
    }
    next();
};

module.exports = { TokenVerify, isAdmin };
