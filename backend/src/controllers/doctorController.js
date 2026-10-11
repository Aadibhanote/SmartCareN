const Doctor = require('../models/Doctor');

exports.getAllDoctors = async (req, res, next) => {
  try {
    const { search, specialty, page = 1, limit = 10 } = req.query;
    const query = { isActive: true };

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (specialty) {
      query.specialty = { $regex: specialty, $options: 'i' };
    }

    const startIndex = (page - 1) * limit;
    
    const doctors = await Doctor.find(query)
      .skip(startIndex)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Doctor.countDocuments(query);

    res.status(200).json({
      success: true,
      count: doctors.length,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total
      },
      data: doctors
    });
  } catch (error) {
    next(error);
  }
};

exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor || !doctor.isActive) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

exports.createDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

exports.updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id, 
      { isActive: false },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
