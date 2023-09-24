const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Akg:ak12345@cluster0.yuucb1n.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

module.exports = mongoose;
