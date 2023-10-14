const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');

// Register a new user
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(201).json({ message:'Email already exists' });
    }

    const newUser = new User({ email, password, role: 'user' });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, config.jwtSecret, {
      expiresIn: '1h', // You can adjust the token expiration time
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
