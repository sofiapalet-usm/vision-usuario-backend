const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  coins: {
    type: Number,
    required: true
  },
  items: {
    type: Array
  },
  outfit: {
    type: Array
  }
});

module.exports = mongoose.model('User', userSchema)