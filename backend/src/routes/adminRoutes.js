const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

router.get('/dashboard', adminAuth, getDashboard);

module.exports = router;
