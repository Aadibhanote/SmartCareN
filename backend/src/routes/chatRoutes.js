const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { handleChat } = require('../controllers/chatController');

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 requests per IP
  message: { success: false, message: 'Too many chat requests from this IP, please try again later' }
});

router.post('/', chatLimiter, handleChat);

module.exports = router;
