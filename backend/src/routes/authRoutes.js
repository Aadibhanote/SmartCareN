const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  logout, 
  getMe, 
  updateProfile, 
  changePassword 
} = require('../controllers/authController');
const { 
  registerValidator, 
  loginValidator, 
  changePasswordValidator 
} = require('../validators/authValidator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/logout', logout);
router.get('/me', auth, getMe);
router.patch('/profile', auth, updateProfile);
router.patch('/change-password', auth, changePasswordValidator, validate, changePassword);

module.exports = router;
