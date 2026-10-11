const OrganDonation = require('../models/OrganDonation');

exports.createOrganDonation = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const organDonation = await OrganDonation.create(req.body);
    res.status(201).json({ success: true, data: organDonation });
  } catch (error) {
    next(error);
  }
};

exports.getMyOrganDonations = async (req, res, next) => {
  try {
    const organDonations = await OrganDonation.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: organDonations.length, data: organDonations });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrganDonations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;

    const organDonations = await OrganDonation.find()
      .populate('user', 'name email')
      .skip(startIndex)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await OrganDonation.countDocuments();

    res.status(200).json({ 
      success: true, 
      count: organDonations.length,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total
      },
      data: organDonations 
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOrganDonationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'reviewed', 'contacted', 'withdrawn'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const organDonation = await OrganDonation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!organDonation) {
      return res.status(404).json({ success: false, message: 'Organ donation not found' });
    }

    res.status(200).json({ success: true, data: organDonation });
  } catch (error) {
    next(error);
  }
};
