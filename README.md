# PathwayPal: Futuristic Academic Advisor (2099)

![PathwayPal Banner](https://img.shields.io/badge/DOOM'S%20UNIVERSITY-PATHWAYPAL-00ffc8?style=for-the-badge&logo=robot&logoColor=white)
![Version](https://img.shields.io/badge/VERSION-2.0.99-00ffc8?style=flat-square)
![Status](https://img.shields.io/badge/STATUS-OPERATIONAL-00ffc8?style=flat-square)

## 🤖 Project Overview

![image](https://github.com/user-attachments/assets/565be665-b409-4d36-b5f2-e7d90c893c71)


**PathwayPal** is an immersive web application that simulates a futuristic academic counselor set in the year 2099 at the fictional "Doom's University." The project integrates GPT API for intelligent conversations with fallback systems using RiveScript for a consistently harsh, demanding AI personality. I leveraged Chart.js for complex data visualizations including radar charts and animated bar graphs, while implementing p5.js for particle systems and holographic effects. The application features a responsive dashboard with real-time highlighting using custom CSS animations and GSAP for smooth transitions. Speech synthesis capabilities were enhanced with a custom Chrome timeout workaround, ensuring uninterrupted dialogue delivery. This project demonstrates advanced front-end techniques while creating an engaging cyberpunk academic environment.

> "The most demanding institution in the solar system in the year 2099."

### [➡️ Click here for the live demo](https://yaakulya123.github.io/D3_Based_Bot/)

---

## Key Features

### Advanced Conversational AI
- **GPT-Powered Responses**: Harnesses advanced natural language processing to deliver context-aware academic guidance
- **Harsh Counselor Persona**: Unique character with impossibly high standards and a demanding personality
- **Custom Conversation Flow**: Maintains chat history and provides contextual answers
- **Futuristic Voice Synthesis**: Text-to-speech with cybernetic intonation for immersive interaction

### Interactive Data Visualizations
- **Department Analytics**: Real-time comparison of research output vs. industry demand
- **Career Trajectory Projection**: Multi-year progression paths across various STEM fields
- **Research Trend Analysis**: Radar visualization of emerging research fields
- **Career Placement Statistics**: Dynamic breakdown of graduate employment sectors

### STEM Skill Ecosystem
- **Interactive Skill Hexagons**: Visual representation of core competencies
- **Domain-Specific Recommendations**: Custom course suggestions based on conversation context
- **Dynamic Highlighting**: UI responds to conversation topics by emphasizing relevant sections

### User Experience
- **Holographic UI Elements**: Particle system and grid backgrounds for futuristic aesthetics
- **Custom Cursor**: Reactive cursor with dynamic feedback on interaction
- **Real-time Notifications**: System alerts with customized animations
- **Ambient System Status**: Simulated quantum core and neural link indicators

---

## Technologies

| Category | Technologies |
|----------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Visualization** | Chart.js, p5.js |
| **AI Integration** | GPT API, Speech Synthesis API |
| **Animation** | GSAP, Custom Particle System |
| **Styling** | Font Awesome, Custom CSS Effects |
| **Backup Systems** | RiveScript Fallback Logic |

---

## Technical Highlights

### Advanced Data Visualization
Implemented complex Chart.js configurations with custom animations, gradients, and interactive tooltips to visualize academic metrics. Created responsive dashboard panels that dynamically update based on conversation context.

```javascript
// Example of radar chart configuration with custom animation effects
new Chart(trendsCtx, {
  type: 'radar',
  data: trendsData,
  options: {
    elements: {
      line: { tension: 0.35 }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  }
});
```

### Context-Aware UI Responses
Developed an intelligent system that highlights relevant dashboard sections based on conversation content, creating a responsive environment that adapts to user interests.

### Custom Particle System
Built a WebGL-powered particle system with dynamic connections, creating an ambient futuristic atmosphere that responds to user interactions.

### Speech Synthesis with Chrome Timeout Workaround
Implemented advanced text-to-speech with a solution for Chrome's 15-second speech timeout issue, ensuring uninterrupted dialogue delivery.

---

## 📐 Architecture

```
PathwayPal
├── AI Core
│   ├── GPT Integration
│   ├── Conversation Context Management
│   └── Fallback Response System
├── Visualization Engine
│   ├── Department Analytics Module
│   ├── Career Trajectory Projector
│   ├── Research Trends Analyzer
│   └── Skills Ecosystem Mapper
├── User Interface
│   ├── Holographic Grid System
│   ├── Particle Effects Generator
│   ├── Custom Cursor Controller
│   └── Notification Manager
└── System Core
    ├── Speech Synthesis Module
    ├── Status Simulation System
    └── Ambient Environment Controller
```

---

## Future Enhancements

- **Neural Interface Simulation**: Add EEG-like visualization pretending to read user brain patterns
- **Holographic 3D Models**: Implement Three.js for 3D representations of career paths
- **Personalized Learning Algorithm**: Develop an adaptive system that evolves based on user interaction patterns
- **Quantum Decision Tree**: Create a visual representation of potential academic decision outcomes
- **AR Classroom Preview**: Simulate future class environments through device camera

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/pathwaypal.git

# Navigate to the project directory
cd pathwaypal

# Open index.html in your browser
# For GPT functionality, add your API key to gpt-integration.js
```

---

##  About the Developer

This project was developed as part of the Advanced Interactive Systems course at Chatbots at NYU. It demonstrates the application of AI in educational contexts while exploring futuristic UI/UX design principles and data visualization techniques.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <img src="https://img.shields.io/badge/QUANTUM%20CORE-ONLINE-00ffc8?style=for-the-badge&logo=atom&logoColor=white">
  <img src="https://img.shields.io/badge/NEURAL%20DB-LINKED-00ffc8?style=for-the-badge&logo=brain&logoColor=white">
  <br>
  <sub>© 2025 PathwayPal • DOOM'S UNIVERSITY</sub>
</div>
