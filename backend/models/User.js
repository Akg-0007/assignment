const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  loginTime: Date,
  messages: [{ text: String, timestamp: Date }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
