// sketch.js - Main p5.js functionality for PathwayPal with GPT integration

let orbitronFont;
let conversationLog = "";
let isProcessingQuery = false; // Flag to prevent multiple simultaneous requests

// DOM elements
let userInput, sendButton, outputDiv;

// Particle system
let particles = [];
const NUM_PARTICLES = 80;

// Canvas for particle effects
let particleCanvas;
let particleCtx;

// Holographic effects
let holoAngle = 0;
let holoRadius = 120;

// Speech synthesis - wrapped in a try-catch to prevent errors
let synth;
let isSpeaking = false;
let speechEnabled = false;

// Typing animation parameters
const TYPING_SPEED = 25; // ms per character
let typingInterval = null;
let currentTypingText = "";
let targetTypingText = "";
let typingElement = null;

function preload() {
  // Try to load the font if it exists, otherwise fallback to system font
  try {
    orbitronFont = loadFont("Orbitron-VariableFont_wght.ttf");
  } catch (e) {
    console.log("Local font not loaded, using web font fallback");
  }
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.style('z-index', '1');
  
  // Set font if loaded
  if (orbitronFont) {
    textFont(orbitronFont);
  }
  
  // Initialize particle system
  initParticleSystem();
  
  // Try to initialize speech synthesis
  try {
    initSpeechSynthesis();
  } catch (e) {
    console.error("Speech synthesis initialization failed:", e);
    // Continue without speech
  }

  // Get DOM elements
  userInput = select("#userInput");
  sendButton = select("#sendButton");
  outputDiv = select("#output");

  // Clear any existing messages first (for when the page reloads)
  outputDiv.html('');
  
  // Add welcome message from bot
  addMessage("bot", "Welcome to Doom's University, fellow student of 2099! I'm PathwayPal, your STEM academic counselor. How can I assist with your coursework, research, or career planning today?");

  // Set up event listeners
  sendButton.mousePressed(askBot);
  document.getElementById("userInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      askBot();
    }
  });

  // Custom cursor
  document.addEventListener("mousemove", (e) => {
    let cursor = document.getElementById("custom-cursor");
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  
  document.addEventListener("mousedown", () => {
    document.getElementById("custom-cursor").classList.add("active");
  });
  
  document.addEventListener("mouseup", () => {
    document.getElementById("custom-cursor").classList.remove("active");
  });
  
  // Create toast notifications with a slight delay
  setTimeout(() => {
    showNotification("Neural Link Active", "Brain-machine interface connected at 98% capacity", "fas fa-brain");
  }, 2000);
  
  setTimeout(() => {
    showNotification("New Research Opportunity", "Quantum Nanobiology lab seeking assistants", "fas fa-flask");
  }, 6000);
}

function draw() {
  clear();
  drawHolographicEffects();
  updateParticles();
}

// ----------------------------
// GPT Integration - Core Chat Function
// ----------------------------
async function askBot() {
  // Prevent multiple simultaneous requests
  if (isProcessingQuery) return;
  
  let txt = userInput.value().trim();
  if (!txt) return;
  
  userInput.value("");
  addMessage("user", txt);
  
  // Start the loading indicator
  isProcessingQuery = true;
  
  // Show typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'message bot typing-indicator';
  typingIndicator.innerHTML = '<div class="dots"><span></span><span></span><span></span></div>';
  document.getElementById("output").appendChild(typingIndicator);
  document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;
  
  try {
    // Get response from GPT
    const response = await window.PathwayPalGPT.queryGPT(txt);
    
    // Remove typing indicator
    document.getElementById("output").removeChild(typingIndicator);
    
    // Add the response with typing animation
    addMessage("bot", response, true);
    
    // Check if we should highlight relevant sections based on the query
    highlightRelevantSections(txt, response);
    
  } catch (error) {
    console.error("Error getting bot reply:", error);
    
    // Remove typing indicator
    document.getElementById("output").removeChild(typingIndicator);
    
    // Fallback response
    addMessage("bot", "My neural circuits are experiencing a temporary glitch. Please try again.");
  }
  
  isProcessingQuery = false;
}

// Highlight relevant sections based on the conversation
function highlightRelevantSections(query, response) {
  const queryLower = query.toLowerCase();
  
  // Check for course-related queries
  if (window.PathwayPalGPT.isAskingForCourseRecommendations(query)) {
    highlightElement("#courses-panel", 2500);
    
    // Find course items in the panel
    const courseItems = document.querySelectorAll('.course-item');
    courseItems.forEach((course, index) => {
      setTimeout(() => {
        course.style.transform = 'translateX(10px)';
        course.style.borderColor = 'rgba(0, 255, 200, 0.5)';
        course.style.boxShadow = '0 0 15px rgba(0, 255, 200, 0.4)';
        
        setTimeout(() => {
          course.style.transform = '';
          course.style.borderColor = '';
          course.style.boxShadow = '';
        }, 1500);
      }, index * 300);
    });
  }
  
  // Check for career-related queries
  if (window.PathwayPalGPT.isAskingAboutCareers(query)) {
    highlightElement("#career-panel", 2000);
    highlightElement("#career-stats", 2000);
  }
  
  // Check for department-specific queries
  const department = window.PathwayPalGPT.getMentionedDepartment(query);
  if (department) {
    highlightElement("#departments-panel", 2000);
  }
  
  // If query involves skills or ecosystem
  if (queryLower.includes("skill") || queryLower.includes("talent") || queryLower.includes("ability")) {
    highlightElement("#skill-hexagons", 2000);
    
    // Pulse all hexagons
    const hexagons = document.querySelectorAll('.hexagon');
    hexagons.forEach((hex, index) => {
      setTimeout(() => {
        hex.classList.add('pulse');
        setTimeout(() => {
          hex.classList.remove('pulse');
        }, 700);
      }, index * 150);
    });
  }
  
  // If query involves research or trends
  if (queryLower.includes("research") || queryLower.includes("trend") || queryLower.includes("publication")) {
    highlightElement("#research-trends", 2000);
  }
}

// Temporarily highlight an element to draw attention to it
function highlightElement(selector, duration = 2000) {
  const element = document.querySelector(selector);
  if (!element) return;
  
  // Store original styles
  const originalBoxShadow = element.style.boxShadow;
  const originalTransform = element.style.transform;
  
  // Apply highlight
  element.style.boxShadow = '0 0 30px rgba(0, 255, 200, 0.7)';
  element.style.transform = 'translateY(-5px)';
  
  // Restore original styles after duration
  setTimeout(() => {
    element.style.boxShadow = originalBoxShadow;
    element.style.transform = originalTransform;
  }, duration);
}

// Add message to the chat with optional typing animation
function addMessage(sender, text, animate = false) {
  let timestamp = getTimestamp();
  let messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  
  let textContent = animate ? '' : text;
  messageDiv.innerHTML = `
    <div class="text">${textContent}</div>
    <div class="timestamp">${timestamp}</div>
  `;
  
  // Add the message to the output container
  document.getElementById("output").appendChild(messageDiv);
  
  // Scroll to bottom
  let outElem = document.getElementById("output");
  outElem.scrollTop = outElem.scrollHeight;
  
  // Apply typing animation if requested and it's a bot message
  if (animate && sender === "bot") {
    const textElement = messageDiv.querySelector('.text');
    
    // Start typing animation
    startTypingAnimation(textElement, text);
  } else if (sender === "bot") {
    // If no animation but it's a bot message, still speak it
    try {
      speakWithFuturisticVoice(text);
    } catch (e) {
      console.error("Failed to speak message:", e);
    }
  }
}

// Start the typing animation for bot responses with concurrent speech
function startTypingAnimation(element, text) {
  // Stop any existing animation
  if (typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
  }
  
  // Initialize typing variables
  currentTypingText = "";
  targetTypingText = text;
  typingElement = element;
  
  // Begin speaking immediately instead of waiting for typing to finish
  try {
    speakWithFuturisticVoice(text);
  } catch (e) {
    console.error("Failed to speak message:", e);
  }
  
  // Start the typing animation
  typingInterval = setInterval(() => {
    if (currentTypingText.length < targetTypingText.length) {
      currentTypingText += targetTypingText.charAt(currentTypingText.length);
      typingElement.innerHTML = currentTypingText;
      
      // Auto-scroll as typing proceeds
      let outElem = document.getElementById("output");
      outElem.scrollTop = outElem.scrollHeight;
    } else {
      // Animation complete
      clearInterval(typingInterval);
      typingInterval = null;
    }
  }, TYPING_SPEED);
}

function getTimestamp() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
}

// ----------------------------
// Particle System
// ----------------------------
function initParticleSystem() {
  particleCanvas = document.getElementById('particleCanvas');
  particleCanvas.width = windowWidth;
  particleCanvas.height = windowHeight;
  particleCtx = particleCanvas.getContext('2d');
  
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push({
      x: Math.random() * windowWidth,
      y: Math.random() * windowHeight,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      color: `rgba(0, ${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, ${Math.random() * 0.5 + 0.1})`
    });
  }
}

function updateParticles() {
  particleCtx.clearRect(0, 0, windowWidth, windowHeight);
  
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    
    // Update position
    p.x += p.speedX;
    p.y += p.speedY;
    
    // Boundary check
    if (p.x < 0 || p.x > windowWidth) p.speedX *= -1;
    if (p.y < 0 || p.y > windowHeight) p.speedY *= -1;
    
    // Draw particle
    particleCtx.beginPath();
    particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    particleCtx.fillStyle = p.color;
    particleCtx.fill();
    
    // Draw connections (only to nearby particles to improve performance)
    for (let j = i + 1; j < particles.length; j++) {
      let p2 = particles[j];
      let dx = p.x - p2.x;
      let dy = p.y - p2.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        particleCtx.beginPath();
        particleCtx.moveTo(p.x, p.y);
        particleCtx.lineTo(p2.x, p2.y);
        particleCtx.strokeStyle = `rgba(0, 255, 200, ${0.05 - distance / 2000})`;
        particleCtx.lineWidth = 0.5;
        particleCtx.stroke();
      }
    }
  }
}

// ----------------------------
// Holographic Effects
// ----------------------------
function drawHolographicEffects() {
  push();
  noFill();
  stroke(0, 255, 200, 25);
  strokeWeight(0.8);
  
  // Rotating holographic rings
  holoAngle += 0.004;
  
  // Center the effect in the window
  translate(0, 0, -200);
  rotateX(sin(holoAngle * 0.4) * 0.2);
  rotateY(cos(holoAngle * 0.2) * 0.2);
  rotateZ(holoAngle);
  
  // Multiple rings with varying radius
  for (let i = 0; i < 4; i++) {
    push();
    let ringRadius = holoRadius + i * 30;
    rotateX(HALF_PI);
    rotateY(holoAngle * (i * 0.1));
    stroke(0, 255, 200, 12 - i * 2);
    torus(ringRadius, 1.5);
    pop();
  }
  
  // Central sphere
  push();
  stroke(0, 255, 200, 8);
  rotateY(holoAngle);
  sphere(40);
  pop();
  
  pop();
}

// ----------------------------
// Speech Synthesis
// ----------------------------
function initSpeechSynthesis() {
  try {
    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
      synth = window.speechSynthesis;
      speechEnabled = true;
      
      // Load available voices
      let voices = synth.getVoices();
      
      // If no voices are available yet, wait for them to load
      if (voices.length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          voices = synth.getVoices();
          console.log("Speech voices loaded:", voices.length);
        });
      } else {
        console.log("Speech voices loaded:", voices.length);
      }
    } else {
      console.log("Speech synthesis not supported in this browser");
      speechEnabled = false;
    }
  } catch (e) {
    console.error("Failed to initialize speech synthesis:", e);
    speechEnabled = false;
  }
}

function speakWithFuturisticVoice(text) {
  if (!speechEnabled || !synth) {
    console.log("Speech synthesis not available, skipping voice output");
    return;
  }
  
  try {
    // Cancel any ongoing speech
    synth.cancel();
    
    // Fix for Chrome's speech synthesis timeout issue
    // Chrome stops speaking after about 15 seconds
    // Solution: Split longer texts into sentences and queue them
    
    // First, let's clean up any existing spaces or breaks to ensure consistent splitting
    const cleanText = text.trim().replace(/\s+/g, ' ');
    
    // Split text into sentences (using period, question mark, or exclamation mark as delimiters)
    const sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [cleanText];
    
    // Function to speak the next sentence in the queue
    const speakNextSentence = (index) => {
      if (index >= sentences.length) return;
      
      const sentence = sentences[index].trim();
      if (!sentence) {
        // Skip empty sentences
        speakNextSentence(index + 1);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(sentence);
      
      // Set voice characteristics for a futuristic academic sound
      utterance.pitch = 1.2;    // Higher pitch for more futuristic sound
      utterance.rate = 1.15;    // Slightly faster for efficiency
      utterance.volume = 1.0;   // Full volume
      
      // Try to find a good voice
      let voices = [];
      try {
        voices = synth.getVoices();
      } catch (e) {
        console.warn("Could not get voices:", e);
      }
      
      if (voices && voices.length > 0) {
        // Find a preferred voice
        const preferredVoices = [
          ...voices.filter(voice => voice.name.includes('Google US English')),
          ...voices.filter(voice => voice.name.includes('Microsoft Zira')),
          ...voices.filter(voice => voice.name.includes('Alex')),
          ...voices.filter(voice => voice.name.includes('Samantha')),
          ...voices.filter(voice => voice.name.toLowerCase().includes('female'))
        ];
        
        // Use the first preferred voice or fall back to default
        if (preferredVoices.length > 0) {
          utterance.voice = preferredVoices[0];
        }
      }
      
      // Queue up the next sentence when this one finishes
      utterance.onend = () => {
        speakNextSentence(index + 1);
      };
      
      // Handle errors and continue with next sentence
      utterance.onerror = (e) => {
        console.error("Speech error:", e);
        speakNextSentence(index + 1);
      };
      
      // Speak the current sentence
      synth.speak(utterance);
    };
    
    // Start speaking the first sentence
    speakNextSentence(0);
    
    // Chrome bug workaround: 
    // The speech synthesis sometimes stops in Chrome
    // This keeps it active by periodically checking
    if (window.chrome) {
      const keepAlive = () => {
        if (synth.speaking) {
          // Force the browser to not pause/timeout the utterance
          setTimeout(keepAlive, 5000);
        }
      };
      keepAlive();
    }
    
  } catch (e) {
    console.error("Error in speech synthesis:", e);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  particleCanvas.width = windowWidth;
  particleCanvas.height = windowHeight;
}

// Notification system
function showNotification(title, message, icon) {
  const container = document.getElementById('notification-container');
  const notification = document.createElement('div');
  notification.className = 'toast-notification';
  
  notification.innerHTML = `
    <div class="toast-icon"><i class="${icon}"></i></div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;
  
  container.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => {
      container.removeChild(notification);
    }, 500);
  }, 5000);
}