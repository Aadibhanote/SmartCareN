const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  specialty: {
    type: String,
    required: [true, 'Specialty is required'],
    trim: true
  },
  qualifications: {
    type: String,
    trim: true
  },
  experience: {
    type: Number,
    default: 0
  },
  consultationFee: {
    type: Number,
    default: 0
  },
  profileImage: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    trim: true
  },
  availableDays: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }],
  timeSlots: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);
