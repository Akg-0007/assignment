const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, mobileNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser = new User({
      name,
      email,
      mobileNumber,
      loginTime: new Date(),
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, 'asdfghjkl', {
      expiresIn: '5m', 
    });

    res.json({ message: 'Registration successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findOne({ name, email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'asdfghjkl', {
      expiresIn: '5m', 
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.getUserMessages = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ messages: user.messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}, 'name email mobileNumber loginTime messages');
    res.json({ users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addMessageToUser = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { message } = req.body;
    user.messages.push({ text: message, timestamp: new Date() });
    await user.save();
    res.json({ message: 'Message added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
