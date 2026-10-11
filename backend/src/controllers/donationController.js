const Donation = require('../models/Donation');

exports.getAllDonations = async (req, res, next) => {
  try {
    const { category, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    else query.status = 'available'; // Default to available

    const startIndex = (page - 1) * limit;

    const donations = await Donation.find(query)
      .skip(startIndex)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Donation.countDocuments(query);

    res.status(200).json({
      success: true,
      count: donations.length,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total
      },
      data: donations
    });
  } catch (error) {
    next(error);
  }
};

exports.getDonationById = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    res.status(200).json({ success: true, data: donation });
  } catch (error) {
    next(error);
  }
};

exports.createDonation = async (req, res, next) => {
  try {
    req.body.createdBy = req.user._id;
    const donation = await Donation.create(req.body);
    res.status(201).json({ success: true, data: donation });
  } catch (error) {
    next(error);
  }
};

exports.updateDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    res.status(200).json({ success: true, data: donation });
  } catch (error) {
    next(error);
  }
};

exports.deleteDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
