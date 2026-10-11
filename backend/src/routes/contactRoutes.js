const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { 
  createContact, 
  getAllContacts, 
  updateContact 
} = require('../controllers/contactController');
const { contactValidator } = require('../validators/contactValidator');
const validate = require('../middleware/validate');
const adminAuth = require('../middleware/adminAuth');

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per IP
  message: { success: false, message: 'Too many contact requests from this IP, please try again after an hour' }
});

router.post('/', contactLimiter, contactValidator, validate, createContact);
router.get('/', adminAuth, getAllContacts);
router.patch('/:id', adminAuth, updateContact);

module.exports = router;
