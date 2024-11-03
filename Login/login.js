const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Sample user data (for demonstration purposes, in a real app use a database)
const users = [
    { name: 'User One', email: 'user1@example.com', password: '$2b$10$...' },
    { name: 'User Two', email: 'user2@example.com', password: '$2b$10$...' },
];

// Login endpoint
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
        return res.status(200).json({ success: true, message: 'Login successful', name: user.name });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
});

module.exports = router;
