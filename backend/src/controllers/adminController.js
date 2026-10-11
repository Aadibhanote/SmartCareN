const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Donation = require('../models/Donation');
const OrganDonation = require('../models/OrganDonation');
const Contact = require('../models/Contact');

exports.getDashboard = async (req, res, next) => {
  try {
    const usersCount = await User.countDocuments({ role: 'user' });
    const doctorsCount = await Doctor.countDocuments({ isActive: true });
    
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    
    const totalDonations = await Donation.countDocuments();
    const totalOrganDonations = await OrganDonation.countDocuments();
    const totalContacts = await Contact.countDocuments({ isRead: false });

    res.status(200).json({
      success: true,
      data: {
        users: usersCount,
        doctors: doctorsCount,
        appointments: {
          total: totalAppointments,
          pending: pendingAppointments
        },
        donations: totalDonations,
        organDonations: totalOrganDonations,
        contacts: totalContacts
      }
    });
  } catch (error) {
    next(error);
  }
};
