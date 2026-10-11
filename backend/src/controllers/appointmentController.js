const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

exports.createAppointment = async (req, res, next) => {
  try {
    const { doctorId, appointmentDate, timeSlot, reason, notes } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.isActive || !doctor.isAvailable) {
      return res.status(400).json({ success: false, message: 'Doctor is not available' });
    }

    const date = new Date(appointmentDate);
    if (date < new Date()) {
      return res.status(400).json({ success: false, message: 'Cannot book appointment in the past' });
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()];
    
    if (!doctor.availableDays.includes(dayOfWeek)) {
      return res.status(400).json({ success: false, message: 'Doctor is not available on this day' });
    }

    if (!doctor.timeSlots.includes(timeSlot)) {
      return res.status(400).json({ success: false, message: 'Invalid time slot for this doctor' });
    }

    // Check for existing appointment
    const existing = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate: date,
      timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'This time slot is already booked' });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      appointmentDate: date,
      timeSlot,
      reason,
      notes
    });

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};

exports.getMyAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate('doctor', 'name specialty profileImage')
      .sort({ appointmentDate: -1 });

    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    next(error);
  }
};

exports.getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'name specialty')
      .populate('patient', 'name email phone');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    if (appointment.patient._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this appointment' });
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};

exports.cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (appointment.status !== 'pending' && appointment.status !== 'confirmed') {
      return res.status(400).json({ success: false, message: 'Cannot cancel an appointment that is already completed or cancelled' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};

exports.getAllAppointments = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status) query.status = status;

    const startIndex = (page - 1) * limit;

    const appointments = await Appointment.find(query)
      .populate('doctor', 'name specialty')
      .populate('patient', 'name email phone')
      .skip(startIndex)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Appointment.countDocuments(query);

    res.status(200).json({ 
      success: true, 
      count: appointments.length,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total
      },
      data: appointments 
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
       return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};
