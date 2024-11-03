const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For password hashing
const connection = require('./db'); // Import the database connection

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check user credentials
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.execute(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length > 0) {
            const user = results[0];
            // Compare hashed password
            bcrypt.compare(password, user.password, (err, match) => {
                if (match) {
                    return res.status(200).json({ success: true, name: user.name });
                } else {
                    return res.status(401).json({ success: false, message: 'Invalid credentials' });
                }
            });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error hashing password' });
        }

        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        connection.execute(query, [name, email, hashedPassword], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ success: false, message: 'Email already exists' });
                }
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            return res.status(201).json({ success: true, message: 'User registered successfully' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
