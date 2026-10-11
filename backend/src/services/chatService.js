const systemPrompt = `You are SmartCareN Assistant, a helpful healthcare platform assistant. You help users navigate the SmartCareN platform. You do NOT diagnose illnesses, prescribe medication, or replace doctors. For emergencies, direct users to call local emergency services. Keep responses concise and helpful.`;

const getFAQResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return "Hello! I'm the SmartCareN Assistant. How can I help you today?";
  }
  if (lowerMsg.includes('appointment') || lowerMsg.includes('book')) {
    return "To book an appointment, go to the Doctors section, find a suitable doctor, and click 'Book Appointment'. You'll need to select an available date and time slot.";
  }
  if (lowerMsg.includes('doctor')) {
    return "You can search for doctors by specialty or name in the Doctors section. We have a variety of specialists available.";
  }
  if (lowerMsg.includes('organ donation') || lowerMsg.includes('organ')) {
    return "We support organ donation registration. Please navigate to the Organ Donation section to fill out the consent form. This is a noble cause.";
  }
  if (lowerMsg.includes('donate') || lowerMsg.includes('blood') || lowerMsg.includes('equipment')) {
    return "You can view or create donation listings for blood, medical equipment, and medicines in the Donations section.";
  }
  if (lowerMsg.includes('contact')) {
    return "If you need further assistance, please use the Contact Us form, and our admin team will get back to you.";
  }
  if (lowerMsg.includes('emergency')) {
    return "⚠️ If this is a medical emergency, please call your local emergency services (e.g., 911, 112) immediately or visit the nearest hospital. I cannot provide emergency medical assistance.";
  }

  return "I'm the SmartCareN Assistant. I can help you with booking appointments, finding doctors, organ donation, and general platform info. Please note I do not provide medical advice. How can I assist you?";
};

const getAIResponse = async (message, history = []) => {
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || 'gemini-2.0-flash';

  if (!apiKey) {
    return getFAQResponse(message);
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    // Format history for Gemini
    const contents = [];
    
    // Add system instructions if supported or inject into first message
    contents.push({
      role: 'user',
      parts: [{ text: `System Instruction: ${systemPrompt}\n\nUser: ${message}` }]
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: contents
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return getFAQResponse(message);
  } catch (error) {
    console.error('Chat API Error:', error);
    return getFAQResponse(message);
  }
};

module.exports = {
  getAIResponse,
  getFAQResponse
};
