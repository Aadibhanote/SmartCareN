const express = require('express');
const router = express.Router();
const { 
  createOrganDonation, 
  getMyOrganDonations, 
  getAllOrganDonations, 
  updateOrganDonationStatus 
} = require('../controllers/organDonationController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Admin routes
router.get('/all', adminAuth, getAllOrganDonations);
router.patch('/:id/status', adminAuth, updateOrganDonationStatus);

// User routes
router.use(auth);
router.post('/', createOrganDonation);
router.get('/my', getMyOrganDonations);

module.exports = router;
