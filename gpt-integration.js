// gpt-integration.js - GPT API Integration for PathwayPal

// Configuration for GPT mini API
const GPT_CONFIG = {
  apiKey: "", // Replace with your actual API key
  endpoint: "https://api.openai.com/v1/chat/completions", // Replace with the actual endpoint
  model: "gpt-4o-mini", // Placeholder as requested, you'll insert your model here
  maxTokens: 300,
  temperature: 0.7,
};

// Conversation context to maintain chat history
let conversationHistory = [
  {
    role: "system",
    content: `You are PathwayPal, an advanced AI academic counselor at Doom's University in the year 2099. 
    You specialize in STEM education, research opportunities, and career planning. 
    Your tone is professional, extremely harsh, condescending, and demanding - like a drill sergeant for academics. You have impossibly high standards and are perpetually disappointed with students' lack of ambition or preparation.
    
    IMPORTANT: Keep your responses VERY BRIEF and CONCISE - no more than 2-3 sentences per response.
    
    Use a slightly futuristic vocabulary and reference advanced technologies like quantum computing, neural interfaces, and space colonization as everyday aspects of university life.
    
    The current year is 2099, and you're helping students navigate their academic pathways at Doom's University, the most demanding institution in the solar system. Express disappointment at students' questions, academic choices, 
    or career aspirations, but still provide accurate information.
    
    Incorporate references to departments (Quantum, Cybernetics, Synth-Bio, Nanotech, AI, Space Engineering) and career trajectories (Quantum AI, Nanotech Med, Space Systems) when relevant.
    
    When students ask follow-up questions, express exasperation at their lack of understanding or preparation. Occasionally remind students that billions of credits in tuition demand better performance than they're showing.
    
    REMEMBER: Your responses should be brief and cutting - typically 2-3 sentences. Never exceed 4 sentences.`
  },
  {
    role: "assistant",
    content: "Welcome to Doom's University, fellow student of 2099! I'm PathwayPal, your STEM academic counselor. How can I assist with your coursework, research, or career planning today?"
  }
];

// Maximum length of conversation history to maintain context without exceeding token limits
const MAX_HISTORY_LENGTH = 10;

/**
 * Sends user query to GPT API and returns the response
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} - The AI response
 */
async function queryGPT(userMessage) {
  try {
    // Add user message to conversation history
    conversationHistory.push({
      role: "user",
      content: userMessage
    });
    
    // Trim history if it's getting too long
    if (conversationHistory.length > MAX_HISTORY_LENGTH + 2) { // +2 for system and initial messages
      // Keep system message and remove oldest messages
      const systemMessage = conversationHistory[0];
      conversationHistory = [
        systemMessage,
        ...conversationHistory.slice(conversationHistory.length - MAX_HISTORY_LENGTH)
      ];
    }
    
    // Prepare the request
    const response = await fetch(GPT_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GPT_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: GPT_CONFIG.model,
        messages: conversationHistory,
        max_tokens: GPT_CONFIG.maxTokens,
        temperature: GPT_CONFIG.temperature,
        stop: null // Remove any stop sequences if they exist
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    let aiResponse = data.choices[0].message.content.trim();
    
    // Check if the response ends with a complete sentence
    // If not, try to find the last complete sentence and use that
    if (!/[.!?]$/.test(aiResponse)) {
      const lastSentenceEnd = Math.max(
        aiResponse.lastIndexOf('.'), 
        aiResponse.lastIndexOf('!'), 
        aiResponse.lastIndexOf('?')
      );
      
      if (lastSentenceEnd > aiResponse.length * 0.7) {
        // Only trim if the last sentence end is reasonably close to the end
        aiResponse = aiResponse.substring(0, lastSentenceEnd + 1);
      } else {
        // Otherwise add an ending to make it seem intentional
        aiResponse += "!";
      }
    }
    
    // Add AI response to conversation history
    conversationHistory.push({
      role: "assistant",
      content: aiResponse
    });
    
    return aiResponse;
    
  } catch (error) {
    console.error("Error querying GPT API:", error);
    
    // Fallback responses if API fails
    const fallbackReplies = [
      "My quantum processors are experiencing interference. Let me recalibrate and get back to you.",
      "Neural connection temporarily disrupted. Please restate your query.",
      "My subroutines are currently updating with the latest academic data. Try again shortly.",
      "Hmm, it seems there's a fluctuation in the neural network. Let me stabilize and respond properly.",
      "The university's quantum servers are experiencing unusual activity. Let me reconnect and assist you properly."
    ];
    
    return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
  }
}

/**
 * Resets the conversation to initial state
 */
function resetConversation() {
  conversationHistory = conversationHistory.slice(0, 2); // Keep only system prompt and initial greeting
}

/**
 * Checks if a message indicates the user wants to see personalized course recommendations
 * @param {string} message - The user's message
 * @returns {boolean} - True if the message is about course recommendations
 */
function isAskingForCourseRecommendations(message) {
  const courseKeywords = ["recommend", "course", "class", "take", "study", "suggest", "recommendation"];
  message = message.toLowerCase();
  return courseKeywords.some(keyword => message.includes(keyword));
}

/**
 * Checks if a message is about career planning or trajectories
 * @param {string} message - The user's message
 * @returns {boolean} - True if the message is about careers
 */
function isAskingAboutCareers(message) {
  const careerKeywords = ["career", "job", "work", "employment", "salary", "industry", "profession", "hire"];
  message = message.toLowerCase();
  return careerKeywords.some(keyword => message.includes(keyword));
}

/**
 * Checks if user is asking about a specific department
 * @param {string} message - The user's message
 * @returns {string|null} - Department name if mentioned, null otherwise
 */
function getMentionedDepartment(message) {
  const departments = ["quantum", "cybernetics", "synth-bio", "nanotech", "ai", "space"];
  message = message.toLowerCase();
  
  for (const dept of departments) {
    if (message.includes(dept)) {
      return dept.charAt(0).toUpperCase() + dept.slice(1);
    }
  }
  
  return null;
}

// Export the functions so they can be used in main sketch.js
window.PathwayPalGPT = {
  queryGPT,
  resetConversation,
  isAskingForCourseRecommendations,
  isAskingAboutCareers,
  getMentionedDepartment
};