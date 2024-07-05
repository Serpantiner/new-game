const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Received registration request:', { username, email });

  try {
    // Check if user already exists
    const [existingUsers] = await db.promise().query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      console.log('Registration failed: User already exists', { username, email });
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const [result] = await db.promise().query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    console.log('User registered successfully:', { id: result.insertId, username, email });
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Received login request:', { email });

  try {
    // Check if user exists
    const [users] = await db.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      console.log('Login failed: User not found', { email });
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash);

    console.log('Password comparison:', { 
      email,
      inputPassword: password,
      storedHash: user.password_hash,
      isValid: validPassword
    });

    if (!validPassword) {
      console.log('Login failed: Invalid password', { email });
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Update last login
    await db.promise().query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );

    // Don't send the password hash to the client
    const { password_hash, ...userWithoutPassword } = user;

    console.log('User logged in successfully:', { id: user.id, email: user.email });
    res.json({ message: 'Logged in successfully', user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});