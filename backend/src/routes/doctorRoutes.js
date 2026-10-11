const express = require('express');
const router = express.Router();
const { 
  getAllDoctors, 
  getDoctorById, 
  createDoctor, 
  updateDoctor, 
  deleteDoctor 
} = require('../controllers/doctorController');
const adminAuth = require('../middleware/adminAuth');

router.route('/')
  .get(getAllDoctors)
  .post(adminAuth, createDoctor);

router.route('/:id')
  .get(getDoctorById)
  .patch(adminAuth, updateDoctor)
  .delete(adminAuth, deleteDoctor);

module.exports = router;
