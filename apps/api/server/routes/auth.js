// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validation/schemas');
const { users } = require('../models/data');

// Register a new user
router.post('/register', async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    
    // Check if email already exists
    const existingUser = users.getByEmail(value.email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);
    
    // Create user
    const newUser = users.create({
      ...value,
      password: hashedPassword
    });
    
    // Remove password from response
    const { password, ...userWithoutPassword } = newUser;
    
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
});

// Login user
router.post('/login', async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    
    // Check if user exists
    const user = users.getByEmail(value.email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
// Check password (TEMPORARY - for testing only)
const validPassword = value.password === user.password;
if (!validPassword) {
  return res.status(400).json({ message: 'Invalid email or password' });
}
    
    // Create and assign token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;