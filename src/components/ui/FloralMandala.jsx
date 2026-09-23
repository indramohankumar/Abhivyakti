import React from 'react';

const FloralMandala = ({ className = "w-full h-full", color = "currentColor", opacity = 1 }) => (
  <svg 
    viewBox="0 0 800 800" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ opacity }}
  >
    <g stroke={color} strokeWidth="2" fill="none" transform="translate(400, 400)">
      {/* Outer intricate scallops */}
      {[...Array(24)].map((_, i) => (
        <path 
          key={`outer-${i}`}
          d="M 0,-360 C 30,-380 50,-340 0,-320 C -50,-340 -30,-380 0,-360"
          transform={`rotate(${i * 15})`}
          fill={`${color}10`}
          strokeWidth="1.5"
        />
      ))}
      
      {/* Outer large lotus petals */}
      {[...Array(12)].map((_, i) => (
        <path 
          key={`petal1-${i}`}
          d="M 0,-320 Q 50,-260 0,-180 Q -50,-260 0,-320"
          transform={`rotate(${i * 30})`}
          strokeWidth="2"
        />
      ))}
      
      {/* Inner offset medium petals */}
      {[...Array(12)].map((_, i) => (
        <path 
          key={`petal2-${i}`}
          d="M 0,-260 Q 40,-200 0,-120 Q -40,-200 0,-260"
          transform={`rotate(${i * 30 + 15})`}
          fill={`${color}08`}
          strokeWidth="2"
        />
      ))}
      
      {/* Inner sharp petals */}
      {[...Array(16)].map((_, i) => (
        <path 
          key={`petal3-${i}`}
          d="M 0,-160 L 20,-100 L 0,-60 L -20,-100 Z"
          transform={`rotate(${i * 22.5})`}
          strokeWidth="1.5"
        />
      ))}
      
      {/* Central rings with dots */}
      <circle r="120" strokeWidth="1" strokeDasharray="4 8" />
      <circle r="100" strokeWidth="2" />
      <circle r="80" strokeWidth="1" />
      
      {/* Core flower */}
      {[...Array(8)].map((_, i) => (
        <path 
          key={`core-${i}`}
          d="M 0,-80 Q 25,-40 0,0 Q -25,-40 0,-80"
          transform={`rotate(${i * 45})`}
          fill={`${color}20`}
          strokeWidth="2"
        />
      ))}
      <circle r="20" fill={color} />
      <circle r="10" fill="white" />
    </g>
  </svg>
);

export default FloralMandala;
