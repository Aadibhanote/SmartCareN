const mongoose = require('mongoose');

const organDonationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required']
  },
  bloodGroup: {
    type: String,
    required: [true, 'Blood group is required'],
    trim: true
  },
  organType: {
    type: String,
    required: [true, 'Organ type is required'],
    enum: ['kidney', 'liver', 'heart', 'lungs', 'cornea', 'bone_marrow', 'skin', 'other']
  },
  message: {
    type: String,
    trim: true
  },
  consent: {
    type: Boolean,
    required: [true, 'Consent is required'],
    validate: {
      validator: function(v) {
        return v === true;
      },
      message: 'You must provide consent'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'contacted', 'withdrawn'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('OrganDonation', organDonationSchema);
