// dashboard.js - Interactive charts and visualizations for PathwayPal

// -------------------------
// Skill Hexagons - Using original styling
// -------------------------
function generateSkillHexagons() {
  const hexagonGrid = document.getElementById('hexagon-grid');
  if (!hexagonGrid) return;
  
  // Clear any existing hexagons first to prevent duplicates
  hexagonGrid.innerHTML = "";
  
  // Skills with icons from your original code (Nano removed)
  const skills = [
    { name: 'Quantum', icon: 'fa-atom' },
    { name: 'Neural', icon: 'fa-brain' },
    { name: 'BioTech', icon: 'fa-dna' },
    { name: 'AI', icon: 'fa-robot' },
    { name: 'CyberSec', icon: 'fa-shield-alt' }
  ];
  
  skills.forEach(skill => {
    const hexagon = document.createElement('div');
    hexagon.className = 'hexagon';
    
    // Using your original HTML structure but with enhanced visuals
    hexagon.innerHTML = `
      <div class="hexagon-inner">
        <i class="fas ${skill.icon} hexagon-icon"></i>
      </div>
      <div class="hexagon-label">${skill.name}</div>
    `;
    
    hexagonGrid.appendChild(hexagon);
    
    // Add click behavior from your original code
    hexagon.addEventListener('click', () => {
      const skillName = hexagon.querySelector('.hexagon-label').textContent;
      const userInput = document.getElementById('userInput');
      if (userInput) {
        userInput.value = `Tell me more about ${skillName} courses`;
      }
      
      // Add pulse animation on click
      hexagon.classList.add('pulse');
      setTimeout(() => {
        hexagon.classList.remove('pulse');
      }, 700);
    });
  });
  
  // Add hover behavior from your original code
  const hexagons = document.querySelectorAll('.hexagon');
  hexagons.forEach(hex => {
    hex.addEventListener('mouseenter', () => {
      hex.style.transform = 'scale(1.08)';
      const icon = hex.querySelector('.hexagon-icon');
      if (icon) {
        icon.style.textShadow = '0 0 15px rgba(0, 255, 200, 1)';
      }
      const label = hex.querySelector('.hexagon-label');
      if (label) {
        label.style.color = 'rgba(0, 255, 200, 1)';
        label.style.textShadow = '0 0 5px rgba(0, 255, 200, 0.7)';
      }
    });
    
    hex.addEventListener('mouseleave', () => {
      hex.style.transform = 'scale(1)';
      const icon = hex.querySelector('.hexagon-icon');
      if (icon) {
        icon.style.textShadow = '';
      }
      const label = hex.querySelector('.hexagon-label');
      if (label) {
        label.style.color = '';
        label.style.textShadow = '';
      }
    });
  });
  
  // Apply enhanced backgrounds to hexagons
  applyHexagonEffects();
}

// Apply special visual effects to hexagons
function applyHexagonEffects() {
  // Add subtle glow to hexagons with enhanced effects
  document.querySelectorAll('.hexagon-inner').forEach((hex, index) => {
    // Staggered animation delay for a more dynamic effect
    const delay = index * 100;
    
    // Enhance hexagon appearance immediately
    hex.style.transition = 'all 0.5s ease-in-out';
    hex.style.background = 'rgba(0, 50, 70, 0.7)';
    
    // Use box-shadow for the side glow effect instead of border
    // This prevents the unwanted top/bottom lines
    hex.style.border = 'none';
    hex.style.boxShadow = '3px 0 5px rgba(0, 255, 200, 0.3), -3px 0 5px rgba(0, 255, 200, 0.3)';
    
    // Make hexagons larger
    hex.style.width = '58px';
    hex.style.height = '58px';
    
    // Enhance the icons
    const icon = hex.querySelector('.hexagon-icon');
    if (icon) {
      icon.style.fontSize = '1.4em';
      icon.style.color = 'rgba(0, 255, 200, 1)';
    }
    
    // Add hexagon labels enhancement
    const parent = hex.parentElement;
    if (parent) {
      const label = parent.querySelector('.hexagon-label');
      if (label) {
        label.style.fontSize = '0.8em';
        label.style.marginTop = '8px';
        label.style.fontWeight = 'bold';
        label.style.letterSpacing = '0.5px';
      }
    }
    
    setTimeout(() => {
      // Apply initial glow - only to the sides, not top/bottom
      hex.style.boxShadow = '3px 0 15px rgba(0, 255, 200, 0.4), -3px 0 15px rgba(0, 255, 200, 0.4), inset 0 0 8px rgba(0, 255, 200, 0.2)';
      
      // Add enhanced pulse effect
      setInterval(() => {
        hex.style.boxShadow = '5px 0 20px rgba(0, 255, 200, 0.6), -5px 0 20px rgba(0, 255, 200, 0.6), inset 0 0 12px rgba(0, 255, 200, 0.3)';
        
        setTimeout(() => {
          hex.style.boxShadow = '3px 0 15px rgba(0, 255, 200, 0.4), -3px 0 15px rgba(0, 255, 200, 0.4), inset 0 0 8px rgba(0, 255, 200, 0.2)';
        }, 1000);
      }, 2000 + (index * 500)); // Different timing for each hexagon
    }, delay);
  });
  
  // Slightly adjust spacing in hexagon grid for better layout
  const hexagonGrid = document.getElementById('hexagon-grid');
  if (hexagonGrid) {
    hexagonGrid.style.gap = '30px'; // Increased spacing for better visibility
    hexagonGrid.style.padding = '20px 10px';
    
    // Add an outer glow to the entire grid section for emphasis
    const parentPanel = hexagonGrid.closest('.dashboard-panel');
    if (parentPanel) {
      parentPanel.style.boxShadow = '0 0 20px rgba(0, 255, 200, 0.3)';
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Set Chart.js global defaults for futuristic style
  Chart.defaults.color = 'rgba(255, 255, 255, 0.8)';
  Chart.defaults.font.family = "sans-serif";
  Chart.defaults.font.size = 11;
  Chart.defaults.font.weight = 'bold';
  Chart.defaults.elements.line.tension = 0.4;
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;
  
  try {
    // Initialize Department Analytics Chart
    initDepartmentsChart();
    
    // Initialize Career Trajectory Chart
    initCareerTrajectoryChart();
    
    // Initialize Research Trends Chart
    initResearchTrendsChart();
    
    // Initialize Career Placement Chart
    initCareerPlacementChart();
    
    // Generate Skill Hexagons
    generateSkillHexagons();
    
    // Update current time for system stats
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
  } catch (error) {
    console.error("Error initializing dashboard:", error);
  }
});

// -------------------------
// Department Analytics Chart
// -------------------------
function initDepartmentsChart() {
  const departmentsCtx = document.getElementById('departmentsChart').getContext('2d');
  
  const departmentsData = {
    labels: ['Quantum', 'Cybernetics', 'Synth-Bio', 'Nanotech', 'AI', 'Space Eng'],
    datasets: [{
      label: 'Research Output',
      data: [89, 76, 82, 68, 95, 79],
      backgroundColor: 'rgba(0, 255, 200, 0.3)',
      borderColor: 'rgba(0, 255, 200, 0.7)',
      borderWidth: 2,
      borderRadius: 5,
      barPercentage: 0.6,
    }, {
      label: 'Industry Demand',
      data: [92, 85, 78, 72, 98, 88],
      backgroundColor: 'rgba(255, 140, 0, 0.3)',
      borderColor: 'rgba(255, 140, 0, 0.7)',
      borderWidth: 2,
      borderRadius: 5,
      barPercentage: 0.6,
    }]
  };
  
  new Chart(departmentsCtx, {
    type: 'bar',
    data: departmentsData,
    options: {
      scales: {
        y: {
          beginAtZero: false,
          min: 50,
          max: 100,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            font: {
              family: "sans-serif",
              size: 10,
              weight: 'bold'
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: "sans-serif",
              size: 10,
              weight: 'bold'
            },
            maxRotation: 30,
            minRotation: 30
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 8,
            font: {
              family: "sans-serif",
              size: 10,
              weight: 'bold'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(20, 30, 50, 0.9)',
          titleColor: 'rgba(0, 255, 200, 0.9)',
          bodyColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: 'rgba(0, 255, 200, 0.5)',
          borderWidth: 1,
          padding: 8,
          displayColors: false,
          titleFont: {
            family: "sans-serif",
            size: 12,
            weight: 'bold'
          },
          bodyFont: {
            family: "sans-serif",
            size: 11
          },
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}%`;
            }
          }
        }
      }
    }
  });
}

// -------------------------
// Research Trends Chart 
// -------------------------
function initResearchTrendsChart() {
  const trendsCtx = document.getElementById('researchTrendsChart').getContext('2d');
  
  const trendsData = {
    labels: ['2095', '2096', '2097', '2098', '2099', '2100'],
    datasets: [{
      label: 'Quantum',
      data: [60, 68, 79, 84, 90, 95],
      borderColor: 'rgba(0, 255, 200, 0.9)',
      backgroundColor: 'rgba(0, 255, 200, 0.3)',
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: 'rgba(0, 255, 200, 1)',
      pointBorderColor: 'rgba(0, 0, 0, 0.7)',
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'rgba(0, 255, 200, 1)',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 2,
      fill: true
    }, {
      label: 'Syn-Bio',
      data: [40, 51, 62, 70, 75, 88],
      borderColor: 'rgba(255, 99, 132, 0.9)',
      backgroundColor: 'rgba(255, 99, 132, 0.3)',
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointBorderColor: 'rgba(0, 0, 0, 0.7)',
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 2,
      fill: true
    }, {
      label: 'Neural',
      data: [45, 58, 70, 81, 87, 92],
      borderColor: 'rgba(255, 206, 86, 0.9)',
      backgroundColor: 'rgba(255, 206, 86, 0.3)',
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: 'rgba(255, 206, 86, 1)',
      pointBorderColor: 'rgba(0, 0, 0, 0.7)',
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'rgba(255, 206, 86, 1)',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 2,
      fill: true
    }]
  };
  
  new Chart(trendsCtx, {
    type: 'radar',
    data: trendsData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            display: false
          },
          grid: {
            color: 'rgba(0, 255, 200, 0.15)',
            lineWidth: 1.5
          },
          angleLines: {
            color: 'rgba(0, 255, 200, 0.2)',
            lineWidth: 1.5
          },
          pointLabels: {
            font: {
              family: "'Orbitron', sans-serif",
              size: 13,
              weight: 'bold'
            },
            color: 'rgba(255, 255, 255, 1)',
            padding: 10
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 15,
            padding: 18,
            font: {
              family: "'Orbitron', sans-serif",
              size: 12,
              weight: 'bold'
            },
            color: 'rgba(255, 255, 255, 1)',
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(20, 30, 50, 0.95)',
          titleColor: 'rgba(0, 255, 200, 1)',
          bodyColor: 'rgba(255, 255, 255, 1)',
          borderColor: 'rgba(0, 255, 200, 0.7)',
          borderWidth: 2,
          displayColors: true,
          bodyFont: {
            family: "'Orbitron', sans-serif",
            size: 12
          },
          titleFont: {
            family: "'Orbitron', sans-serif",
            size: 13,
            weight: 'bold'
          },
          callbacks: {
            title: function(context) {
              return context[0].label;
            },
            label: function(context) {
              return ` ${context.dataset.label}: ${context.raw}%`;
            }
          }
        }
      },
      elements: {
        line: {
          tension: 0.35
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
  
  // Add enhanced glow effects to the canvas
  const canvas = document.getElementById('researchTrendsChart');
  if (canvas) {
    canvas.style.filter = 'drop-shadow(0 0 10px rgba(0, 255, 200, 0.5))';
    
    // Add a subtle animation to the glow effect
    let glowIntensity = 0.4;
    let increasing = true;
    
    setInterval(() => {
      if (increasing) {
        glowIntensity += 0.03;
        if (glowIntensity >= 0.6) increasing = false;
      } else {
        glowIntensity -= 0.03;
        if (glowIntensity <= 0.4) increasing = true;
      }
      
      canvas.style.filter = `drop-shadow(0 0 12px rgba(0, 255, 200, ${glowIntensity}))`;
    }, 100);
  }
}

// -------------------------
// Career Placement Chart
// -------------------------
function initCareerPlacementChart() {
  const placementCtx = document.getElementById('careerPlacementChart').getContext('2d');
  
  const placementData = {
    labels: ['Off-World', 'Research', 'Orbital', 'Corporate', 'Startups', 'Gov'],
    datasets: [{
      data: [25, 30, 15, 10, 12, 8],
      backgroundColor: [
        'rgba(0, 255, 200, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)'
      ],
      borderColor: 'rgba(0, 20, 40, 0.7)',
      borderWidth: 2,
      hoverOffset: 5,
      hoverBorderWidth: 3,
      hoverBorderColor: 'rgba(0, 255, 200, 0.9)'
    }]
  };
  
  new Chart(placementCtx, {
    type: 'doughnut',
    data: placementData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 14,
            padding: 15,
            font: {
              family: "'Orbitron', sans-serif",
              size: 11
            },
            color: 'rgba(255, 255, 255, 0.9)',
            usePointStyle: true,
            pointStyle: 'rectRounded'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(20, 30, 50, 0.9)',
          titleColor: 'rgba(0, 255, 200, 0.9)',
          bodyColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: 'rgba(0, 255, 200, 0.5)',
          borderWidth: 1,
          displayColors: true,
          enabled: true,
          callbacks: {
            label: function(context) {
              return ` ${context.label}: ${context.raw}%`;
            }
          }
        }
      },
      // Add animation effects for a more futuristic look
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000,
        easing: 'easeOutQuart'
      },
      elements: {
        arc: {
          borderWidth: 2,
          borderColor: 'rgba(0, 20, 40, 0.7)'
        }
      }
    }
  });
  
  // Add a glow effect to the canvas
  const canvas = document.getElementById('careerPlacementChart');
  if (canvas) {
    canvas.style.filter = 'drop-shadow(0 0 6px rgba(0, 255, 200, 0.3))';
  }
}

// -------------------------
// System Time Display and Status
// -------------------------
function updateCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    
    // Add pulsing animation to the time every 10 seconds
    if (seconds % 10 === 0) {
      timeElement.style.textShadow = '0 0 10px rgba(0, 255, 200, 0.9)';
      setTimeout(() => {
        timeElement.style.textShadow = 'none';
      }, 1000);
    }
  }
  
  // Randomly update other system stats occasionally to create dynamic effect
  if (Math.random() > 0.99) {
    const quantumCore = document.querySelector('#system-stats .stat-item:nth-child(1) span');
    if (quantumCore) {
      quantumCore.textContent = Math.random() > 0.5 ? 'QUANTUM CORE: ONLINE' : 'QUANTUM CORE: OPTIMIZING';
      quantumCore.style.color = 'rgba(0, 255, 200, 0.9)';
      quantumCore.style.textShadow = '0 0 8px rgba(0, 255, 200, 0.8)';
      
      setTimeout(() => {
        quantumCore.textContent = 'QUANTUM CORE: ONLINE';
        quantumCore.style.color = '';
        quantumCore.style.textShadow = '';
      }, 3000);
    }
  }
  
  if (Math.random() > 0.995) {
    const securityStatus = document.querySelector('#system-stats .stat-item:nth-child(5) span');
    if (securityStatus) {
      securityStatus.textContent = 'SECURITY: SCANNING';
      securityStatus.style.color = 'rgba(255, 206, 86, 0.9)';
      securityStatus.style.textShadow = '0 0 8px rgba(255, 206, 86, 0.8)';
      
      setTimeout(() => {
        securityStatus.textContent = 'SECURITY: MAXIMUM';
        securityStatus.style.color = '';
        securityStatus.style.textShadow = '';
      }, 2000);
    }
  }
  
  // Occasionally show a neural link fluctuation effect
  if (Math.random() > 0.997) {
    const neuralDB = document.querySelector('#system-stats .stat-item:nth-child(2) span');
    if (neuralDB) {
      neuralDB.textContent = 'NEURAL DB: SYNCING';
      neuralDB.style.color = 'rgba(153, 102, 255, 0.9)';
      neuralDB.style.textShadow = '0 0 8px rgba(153, 102, 255, 0.8)';
      
      // After a short delay, show a resyncing animation
      setTimeout(() => {
        neuralDB.textContent = 'NEURAL DB: LINKED';
        neuralDB.style.color = '';
        neuralDB.style.textShadow = '';
      }, 1500);
    }
  }
}

// -------------------------
// Career Trajectory Chart
// -------------------------
function initCareerTrajectoryChart() {
  const trajectoryCtx = document.getElementById('trajectoryChart').getContext('2d');
  
  const trajectoryData = {
    labels: ['Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6'],
    datasets: [{
      label: 'Quantum AI',
      data: [40, 60, 75, 85, 92, 98],
      borderColor: 'rgba(0, 255, 200, 0.9)',
      backgroundColor: 'rgba(0, 255, 200, 0.05)',
      pointBackgroundColor: 'rgba(0, 255, 200, 0.9)',
      pointBorderColor: '#000',
      pointRadius: 3,
      fill: true
    }, {
      label: 'Nanotech Med',
      data: [45, 55, 60, 78, 86, 90],
      borderColor: 'rgba(255, 140, 0, 0.9)',
      backgroundColor: 'rgba(255, 140, 0, 0.05)',
      pointBackgroundColor: 'rgba(255, 140, 0, 0.9)',
      pointBorderColor: '#000',
      pointRadius: 3,
      fill: true
    }, {
      label: 'Space Systems',
      data: [30, 50, 65, 70, 82, 88],
      borderColor: 'rgba(75, 192, 192, 0.9)',
      backgroundColor: 'rgba(75, 192, 192, 0.05)',
      pointBackgroundColor: 'rgba(75, 192, 192, 0.9)',
      pointBorderColor: '#000',
      pointRadius: 3,
      fill: true
    }]
  };
  
  new Chart(trajectoryCtx, {
    type: 'line',
    data: trajectoryData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            font: {
              family: "sans-serif",
              size: 10,
              weight: 'bold'
            },
            callback: function(value) {
              return value + '%';
            }
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            font: {
              family: "sans-serif",
              size: 10,
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 6,
            font: {
              family: "sans-serif",
              size: 10,
              weight: 'bold'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(20, 30, 50, 0.9)',
          titleColor: 'rgba(0, 255, 200, 0.9)',
          bodyColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: 'rgba(0, 255, 200, 0.5)',
          borderWidth: 1,
          displayColors: true,
          titleFont: {
            family: "sans-serif",
            size: 12,
            weight: 'bold'
          },
          bodyFont: {
            family: "sans-serif",
            size: 11
          },
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}% potential`;
            }
          }
        }
      }
    }
  });
}