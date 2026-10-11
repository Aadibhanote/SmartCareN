const express = require('express');
const router = express.Router();
const { 
  getAllDonations, 
  getDonationById, 
  createDonation, 
  updateDonation, 
  deleteDonation 
} = require('../controllers/donationController');
const adminAuth = require('../middleware/adminAuth');

router.route('/')
  .get(getAllDonations)
  .post(adminAuth, createDonation);

router.route('/:id')
  .get(getDonationById)
  .patch(adminAuth, updateDonation)
  .delete(adminAuth, deleteDonation);

module.exports = router;
