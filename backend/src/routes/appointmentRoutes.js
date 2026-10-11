const express = require('express');
const router = express.Router();
const { 
  createAppointment, 
  getMyAppointments, 
  getAppointmentById, 
  cancelAppointment, 
  getAllAppointments, 
  updateAppointmentStatus 
} = require('../controllers/appointmentController');
const { appointmentValidator } = require('../validators/appointmentValidator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Protected routes (Admin)
router.get('/all', adminAuth, getAllAppointments);

// Protected routes (User)
router.use(auth);
router.post('/', appointmentValidator, validate, createAppointment);
router.get('/my', getMyAppointments);
router.get('/:id', getAppointmentById);
router.patch('/:id/cancel', cancelAppointment);

// Protected route (Admin - status update)
router.patch('/:id/status', adminAuth, updateAppointmentStatus);

module.exports = router;
