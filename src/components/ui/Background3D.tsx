import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Background3D: React.FC = () => {
  const { theme } = useTheme();
  
  // Generate random positions for dense packing
  const generateRandomElements = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: 0.3 + Math.random() * 0.7,
      delay: Math.random() * 5
    }));
  };

  const elements = generateRandomElements(150);
  const dots = generateRandomElements(200);

  // Neon colors for light and dark themes
  const neonColors = theme === 'dark' 
    ? ['#00ff88', '#ff0080', '#0080ff', '#ffff00', '#ff8000', '#8000ff', '#00ffff', '#ff4080']
    : ['#0066cc', '#cc0066', '#00cc66', '#cc6600', '#6600cc', '#cc0000', '#0099cc', '#99cc00'];

  const iconPaths = [
    // Heart
    "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    // Star
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    // Circle
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
    // Triangle
    "M12 2l10 18H2L12 2z",
    // Square
    "M3 3h18v18H3V3z",
    // Diamond
    "M12 2l8 10-8 10L4 12 12 2z",
    // Hexagon
    "M17.5 3.5L22 12l-4.5 8.5h-11L2 12l4.5-8.5h11z",
    // Plus
    "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    // Phone
    "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
    // Camera
    "M9 2l1.17 1H14l1.17-1H20c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h5zm3 15c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z",
    // Music note
    "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z",
    // Thumbs up
    "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dense pattern of colorful neon icons */}
      {elements.map((element, index) => {
        const color = neonColors[index % neonColors.length];
        const iconPath = iconPaths[index % iconPaths.length];
        
        return (
          <div
            key={element.id}
            className="absolute opacity-20"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
              animation: `float 6s ease-in-out infinite`,
              animationDelay: `${element.delay}s`
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill={color}
              className="drop-shadow-sm"
            >
              <path d={iconPath} />
            </svg>
          </div>
        );
      })}

      {/* Dense dots pattern */}
      {dots.map((dot, index) => {
        const color = neonColors[index % neonColors.length];
        
        return (
          <div
            key={`dot-${dot.id}`}
            className="absolute rounded-full opacity-30"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: color,
              animation: `pulse 3s ease-in-out infinite`,
              animationDelay: `${dot.delay}s`
            }}
          />
        );
      })}

      {/* Statistical chart shapes */}
      <div className="absolute top-10 left-10 w-32 h-20 opacity-20">
        <svg viewBox="0 0 120 80" className="w-full h-full">
          {Array.from({ length: 7 }, (_, i) => (
            <rect 
              key={i}
              x={10 + i * 15} 
              y={60 - Math.random() * 40} 
              width="8" 
              height={20 + Math.random() * 40} 
              fill={neonColors[i % neonColors.length]}
            />
          ))}
        </svg>
      </div>

      <div className="absolute bottom-20 right-20 w-28 h-28 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {Array.from({ length: 5 }, (_, i) => (
            <circle 
              key={i}
              cx="50" 
              cy="50" 
              r={10 + i * 8} 
              fill="none" 
              stroke={neonColors[i % neonColors.length]} 
              strokeWidth="2" 
              strokeDasharray={`${5 + i * 3} ${3 + i * 2}`}
            />
          ))}
        </svg>
      </div>

      <div className="absolute top-1/3 right-1/4 w-24 h-16 opacity-20">
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <path 
            d="M10,50 Q30,20 50,30 T90,25" 
            stroke={neonColors[0]} 
            strokeWidth="3" 
            fill="none" 
          />
          <path 
            d="M10,55 Q30,35 50,40 T90,35" 
            stroke={neonColors[1]} 
            strokeWidth="2" 
            fill="none" 
          />
          {Array.from({ length: 5 }, (_, i) => (
            <circle 
              key={i}
              cx={10 + i * 20} 
              cy={50 - Math.random() * 20} 
              r="2" 
              fill={neonColors[i % neonColors.length]}
            />
          ))}
        </svg>
      </div>

      {/* More geometric shapes scattered around */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={`geo-${i}`}
          className="absolute opacity-15"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `spin 20s linear infinite`,
            animationDelay: `${Math.random() * 10}s`
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            {i % 4 === 0 && (
              <polygon 
                points="8,2 14,14 2,14" 
                fill={neonColors[i % neonColors.length]}
              />
            )}
            {i % 4 === 1 && (
              <rect 
                x="2" y="2" width="12" height="12" 
                fill={neonColors[i % neonColors.length]}
                transform="rotate(45 8 8)"
              />
            )}
            {i % 4 === 2 && (
              <circle 
                cx="8" cy="8" r="6" 
                fill={neonColors[i % neonColors.length]}
              />
            )}
            {i % 4 === 3 && (
              <polygon 
                points="8,1 15,8 8,15 1,8" 
                fill={neonColors[i % neonColors.length]}
              />
            )}
          </svg>
        </div>
      ))}

      {/* Gradient overlays for depth */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500/5 to-pink-500/5 rounded-full blur-3xl" />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Background3D;