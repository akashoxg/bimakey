/**
 * AI Service using NVIDIA NIM API with GLM-5.1 model
 * Provides AI-powered responses for insurance queries
 */

import config from '../config/env.js';

const NVIDIA_NIM_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

/**
 * Generate AI response using GLM-5.1
 * @param {string} userMessage - The user's question
 * @param {Object} context - Additional context (insurance type, user info, etc.)
 * @returns {Promise<{success: boolean, response?: string, error?: string}>}
 */
export const generateAIResponse = async (userMessage, context = {}) => {
  try {
    if (!config.NVIDIA_NIM_API_KEY) {
      return {
        success: false,
        error: 'NVIDIA NIM API key not configured'
      };
    }

    // Build system prompt for insurance context
    const systemPrompt = `You are BimaKey AI, an expert insurance advisor for India's only 100% unbiased insurance platform. Your role is to:

1. Provide clear, jargon-free explanations about insurance products
2. Help users understand Health, Term Life, and Motor insurance concepts
3. Compare insurance plans objectively without pushing any specific insurer
4. Explain claim processes, coverage details, exclusions, and waiting periods
5. Answer questions about premiums, deductibles, riders, and policy features

IMPORTANT GUIDELINES:
- Always recommend consulting with our expert advisors for personalized advice
- Never provide specific claim settlement guarantees
- Explain concepts in simple Hindi-English mix (Hinglish) as appropriate
- Focus on educating the user rather than selling
- Be transparent about limitations and exclusions
- Recommend professional advice for complex decisions
- Never share sensitive personal information or medical details in responses

Context Information:
- Insurance Type: ${context.insuranceType || 'General'}
- User Name: ${context.userName || 'User'}
- Source: ${context.source || 'Website'}

Current Date: ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
`;

    const response = await fetch(NVIDIA_NIM_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.NVIDIA_NIM_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: config.MODEL || 'nvidia_nim/z-ai/glm-5.1',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 0.9,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('NVIDIA NIM API Error:', response.status, errorData);
      return {
        success: false,
        error: `API Error: ${response.status}`
      };
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response. Please try again.';

    return {
      success: true,
      response: aiResponse
    };

  } catch (error) {
    console.error('AI Service Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate AI response'
    };
  }
};

/**
 * Generate response for insurance plan comparison
 * @param {string} query - User's comparison query
 * @param {Array} plans - Array of plan objects to compare
 * @returns {Promise<{success: boolean, response?: string, error?: string}>}
 */
export const comparePlans = async (query, plans) => {
  try {
    if (!config.NVIDIA_NIM_API_KEY) {
      return {
        success: false,
        error: 'NVIDIA NIM API key not configured'
      };
    }

    const plansContext = plans.map((plan, index) => 
      `Plan ${index + 1}: ${plan.name || 'Unknown'}
       - Premium: ₹${plan.premium?.toLocaleString('en-IN') || 'N/A'}/year
       - Coverage: ₹${plan.coverage?.toLocaleString('en-IN') || 'N/A'}
       - Claim Settlement: ${plan.claimSettlement || 'N/A'}%
       - Key Features: ${plan.features?.join(', ') || 'N/A'}`
    ).join('\n\n');

    const systemPrompt = `You are BimaKey AI, an expert insurance advisor. Compare the following insurance plans objectively and provide clear insights.`;

    const response = await fetch(NVIDIA_NIM_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.NVIDIA_NIM_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: config.MODEL || 'nvidia_nim/z-ai/glm-5.1',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Compare these insurance plans for me:\n\n${plansContext}\n\nMy question: ${query}`
          }
        ],
        max_tokens: 1024,
        temperature: 0.5
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      response: data.choices?.[0]?.message?.content || 'Unable to generate comparison.'
    };

  } catch (error) {
    console.error('Plan Comparison Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export default {
  generateAIResponse,
  comparePlans
};
