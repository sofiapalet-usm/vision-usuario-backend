const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  technique: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  scores: {
    type: Array,
    required: true
  },
});

module.exports = mongoose.model('Activity', activitySchema)