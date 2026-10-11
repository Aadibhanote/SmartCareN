const { body } = require('express-validator');

const appointmentValidator = [
  body('doctorId').notEmpty().withMessage('Doctor ID is required'),
  body('appointmentDate').isISO8601().withMessage('Valid appointment date is required'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
];

module.exports = {
  appointmentValidator
};
