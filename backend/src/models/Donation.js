const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['blood', 'equipment', 'medicine', 'other']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  contactInfo: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['available', 'fulfilled', 'inactive'],
    default: 'available'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);
