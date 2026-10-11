const Contact = require('../models/Contact');

exports.createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

exports.getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;

    const contacts = await Contact.find()
      .skip(startIndex)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Contact.countDocuments();

    res.status(200).json({ 
      success: true, 
      count: contacts.length,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total
      },
      data: contacts 
    });
  } catch (error) {
    next(error);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { isRead, response } = req.body;
    
    const fieldsToUpdate = {};
    if (isRead !== undefined) fieldsToUpdate.isRead = isRead;
    if (response !== undefined) fieldsToUpdate.response = response;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};
