import { generateAIResponse, comparePlans } from '../utils/aiService.js';

/**
 * Chat with AI powered by GLM-5.1
 */
const chatWithAI = async (req, res, next) => {
  try {
    const { message, context, type } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Validate message length
    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Message is too long. Maximum 2000 characters allowed.'
      });
    }

    let result;

    if (type === 'compare' && context?.plans) {
      // Plan comparison request
      result = await comparePlans(message, context.plans);
    } else {
      // Standard AI chat request
      result = await generateAIResponse(message, {
        insuranceType: context?.insuranceType,
        userName: context?.userName,
        source: context?.source || 'website'
      });
    }

    if (!result.success) {
      // If AI service fails, provide fallback response
      return res.status(200).json({
        success: true,
        response: getFallbackResponse(message),
        fallback: true
      });
    }

    res.status(200).json({
      success: true,
      response: result.response,
      model: 'glm-5.1'
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Get AI service health status
 */
const getAIHealth = async (req, res) => {
  res.status(200).json({
    success: true,
    status: 'operational',
    model: 'nvidia_nim/z-ai/glm-5.1',
    timestamp: new Date().toISOString()
  });
};

/**
 * Fallback responses when AI service is unavailable
 */
const getFallbackResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('health') && lowerMessage.includes('insurance')) {
    return "I'd love to help with your health insurance query! For personalized advice, our expert advisors are just a call away at +91 9717427154. Meanwhile, you can explore our comprehensive health insurance plans at /health-insurance/plans";
  }
  
  if (lowerMessage.includes('term') && lowerMessage.includes('insurance')) {
    return "For term insurance guidance, our experts can help you find the right coverage. Contact us at +91 9717427154 or visit /life-insurance/plans to compare top-rated term plans in India.";
  }
  
  if (lowerMessage.includes('motor') && lowerMessage.includes('insurance')) {
    return "Need help with motor insurance? Our team can assist with car and bike insurance queries. Call +91 9717427154 or check /motor-insurance/plans for comprehensive coverage options.";
  }
  
  if (lowerMessage.includes('claim')) {
    return "For claim assistance, we provide free lifelong support! Visit /claim-assistance or call +91 9717427154. Our experts will guide you through the entire process.";
  }
  
  return "Thanks for your question! For detailed insurance guidance tailored to your needs, please connect with our expert advisors at +91 9717427154 or use the contact form. We're here to help! 😊";
};

export {
  chatWithAI,
  getAIHealth
};
