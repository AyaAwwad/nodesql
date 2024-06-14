const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const { validateLogin, validateRegister } = require('../validation/userValidation');
const adminCheck = require('../middlewares/adminCheck');

// Register new user
router.post('/register', async (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    db.query('SELECT * FROM users WHERE email = ?', [req.body.email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error: ' + err });
        if (results.length > 0) return res.status(400).json({ message: 'This user is already registered' });

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        db.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [req.body.email, hashedPassword, req.body.role], (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error: ' + err });

            const token = jwt.sign({ id: result.insertId, role: req.body.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            res.status(201).json({ id: result.insertId, email: req.body.email, role: req.body.role, token });
        });
    });
});

// Login user
router.post('/login', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    db.query('SELECT * FROM users WHERE email = ?', [req.body.email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error: ' + err });
        if (results.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ id: user.id, email: user.email, role: user.role, token });
    });
});

// Get all users (admin only)
router.get('/users', adminCheck, (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error: ' + err });
        res.json(results);
    });
});

// Get user by ID (admin only)
router.get('/users/:id', adminCheck, (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error: ' + err });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
});

// Delete user (admin only)
router.delete('/users/:id', adminCheck, (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error: ' + err });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;
