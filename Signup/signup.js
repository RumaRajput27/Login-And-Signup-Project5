const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Sample user data (for demonstration purposes, in a real app use a database)
const users = [];

// Signup endpoint
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists by email
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new user to users array (in a real app, save to database)
    users.push({ name, email, password: hashedPassword });

    return res.status(201).json({ success: true, message: 'User registered successfully' });
});

module.exports = router;
