const { getAIResponse } = require('../services/chatService');

exports.handleChat = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const reply = await getAIResponse(message, history);

    res.status(200).json({ 
      success: true, 
      reply: reply + "\n\n*Disclaimer: I am an AI assistant and cannot provide medical advice. Please consult a qualified doctor for medical concerns.*"
    });
  } catch (error) {
    next(error);
  }
};
