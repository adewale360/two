import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Background3D: React.FC = () => {
  const { theme } = useTheme();
  
  // Generate random positions for ultra-dense packing (800+ elements)
  const generateRandomElements = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: 0.2 + Math.random() * 0.6,
      delay: Math.random() * 8,
      type: Math.floor(Math.random() * 12) // 12 different types
    }));
  };

  const elements = generateRandomElements(300); // Main icons
  const dots = generateRandomElements(250); // Dots
  const lines = generateRandomElements(100); // Lines and curves
  const shapes = generateRandomElements(150); // Geometric shapes

  // Neon colors optimized for light and dark themes
  const neonColors = theme === 'dark' 
    ? ['#00ff88', '#ff0080', '#0080ff', '#ffff00', '#ff8000', '#8000ff', '#00ffff', '#ff4080', '#80ff00', '#ff0040', '#4080ff', '#ff8040']
    : ['#0066cc', '#cc0066', '#00cc66', '#cc6600', '#6600cc', '#cc0000', '#0099cc', '#99cc00', '#cc3300', '#3300cc', '#00cc99', '#cc9900'];

  // Comprehensive icon collection for WhatsApp-style density
  const iconElements = [
    // Communication & Social
    '💬', '📱', '📞', '✉️', '📧', '📨', '📩', '📤', '📥', '📮', '🔔', '🔕',
    // Technology & Computing
    '💻', '🖥️', '⌨️', '🖱️', '🖨️', '💾', '💿', '📀', '🔌', '🔋', '📡', '📺',
    // Education & Learning
    '📚', '📖', '📝', '✏️', '🖊️', '🖍️', '📐', '📏', '🧮', '🎓', '🏫', '📊',
    // Science & Research
    '🔬', '🧪', '🧬', '⚗️', '🔭', '🌡️', '💊', '🩺', '⚕️', '🧲', '⚛️', '🔋',
    // Business & Finance
    '💼', '💰', '💳', '💎', '📈', '📉', '💹', '🏦', '🏢', '🏭', '⚖️', '📋',
    // Transportation
    '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚',
    // Food & Drinks
    '🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭',
    // Sports & Activities
    '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓',
    // Music & Entertainment
    '🎵', '🎶', '🎤', '🎧', '📻', '🎸', '🎹', '🥁', '🎺', '🎷', '🎻', '🪕',
    // Weather & Nature
    '☀️', '🌙', '⭐', '🌟', '💫', '⚡', '☁️', '⛅', '🌤️', '🌦️', '🌧️', '⛈️',
    // Symbols & Shapes
    '❤️', '💙', '💚', '💛', '🧡', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕',
    // Tools & Objects
    '🔨', '🪓', '⛏️', '🔧', '🔩', '⚙️', '🪚', '🔗', '⛓️', '🪝', '📎', '📌'
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ultra-dense pattern of emoji-style icons */}
      {elements.map((element, index) => {
        const color = neonColors[index % neonColors.length];
        const icon = iconElements[index % iconElements.length];
        
        return (
          <div
            key={`icon-${element.id}`}
            className="absolute select-none"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
              opacity: theme === 'dark' ? 0.15 : 0.08,
              fontSize: `${8 + Math.random() * 8}px`,
              animation: `float 8s ease-in-out infinite`,
              animationDelay: `${element.delay}s`,
              filter: `hue-rotate(${Math.random() * 360}deg)`
            }}
          >
            {icon}
          </div>
        );
      })}

      {/* Dense dots pattern */}
      {dots.map((dot, index) => {
        const color = neonColors[index % neonColors.length];
        
        return (
          <div
            key={`dot-${dot.id}`}
            className="absolute rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              backgroundColor: color,
              opacity: theme === 'dark' ? 0.25 : 0.12,
              animation: `pulse 4s ease-in-out infinite`,
              animationDelay: `${dot.delay}s`
            }}
          />
        );
      })}

      {/* Random lines and curves */}
      {lines.map((line, index) => {
        const color = neonColors[index % neonColors.length];
        
        return (
          <div
            key={`line-${line.id}`}
            className="absolute"
            style={{
              left: `${line.x}%`,
              top: `${line.y}%`,
              width: `${10 + Math.random() * 20}px`,
              height: `${1 + Math.random() * 2}px`,
              backgroundColor: color,
              opacity: theme === 'dark' ? 0.2 : 0.1,
              transform: `rotate(${line.rotation}deg)`,
              borderRadius: '2px',
              animation: `drift 12s linear infinite`,
              animationDelay: `${line.delay}s`
            }}
          />
        );
      })}

      {/* Geometric shapes */}
      {shapes.map((shape, index) => {
        const color = neonColors[index % neonColors.length];
        const shapeType = shape.type % 6;
        
        return (
          <div
            key={`shape-${shape.id}`}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              opacity: theme === 'dark' ? 0.18 : 0.09,
              transform: `rotate(${shape.rotation}deg) scale(${shape.scale})`,
              animation: `spin 15s linear infinite`,
              animationDelay: `${shape.delay}s`
            }}
          >
            {shapeType === 0 && (
              <div 
                className="w-full h-full rounded-full" 
                style={{ backgroundColor: color }}
              />
            )}
            {shapeType === 1 && (
              <div 
                className="w-full h-full" 
                style={{ 
                  backgroundColor: color,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                }}
              />
            )}
            {shapeType === 2 && (
              <div 
                className="w-full h-full" 
                style={{ backgroundColor: color }}
              />
            )}
            {shapeType === 3 && (
              <div 
                className="w-full h-full" 
                style={{ 
                  backgroundColor: color,
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                }}
              />
            )}
            {shapeType === 4 && (
              <div 
                className="w-full h-full" 
                style={{ 
                  backgroundColor: color,
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                }}
              />
            )}
            {shapeType === 5 && (
              <div 
                className="w-full h-full" 
                style={{ 
                  backgroundColor: color,
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                }}
              />
            )}
          </div>
        );
      })}

      {/* Statistical chart patterns */}
      <div className="absolute top-5 left-5 w-20 h-12 opacity-10">
        <svg viewBox="0 0 80 48" className="w-full h-full">
          {Array.from({ length: 8 }, (_, i) => (
            <rect 
              key={i}
              x={i * 9 + 2} 
              y={36 - Math.random() * 24} 
              width="4" 
              height={12 + Math.random() * 24} 
              fill={neonColors[i % neonColors.length]}
            />
          ))}
        </svg>
      </div>

      <div className="absolute bottom-10 right-10 w-16 h-16 opacity-10">
        <svg viewBox="0 0 64 64" className="w-full h-full">
          {Array.from({ length: 4 }, (_, i) => (
            <circle 
              key={i}
              cx="32" 
              cy="32" 
              r={8 + i * 6} 
              fill="none" 
              stroke={neonColors[i % neonColors.length]} 
              strokeWidth="1" 
              strokeDasharray={`${3 + i * 2} ${2 + i}`}
            />
          ))}
        </svg>
      </div>

      <div className="absolute top-1/4 right-1/3 w-18 h-10 opacity-10">
        <svg viewBox="0 0 72 40" className="w-full h-full">
          <path 
            d="M5,35 Q20,15 35,25 Q50,10 67,20" 
            stroke={neonColors[0]} 
            strokeWidth="1.5" 
            fill="none" 
          />
          {Array.from({ length: 6 }, (_, i) => (
            <circle 
              key={i}
              cx={5 + i * 12} 
              cy={35 - Math.random() * 15} 
              r="1" 
              fill={neonColors[i % neonColors.length]}
            />
          ))}
        </svg>
      </div>

      {/* More scattered mini-charts */}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={`chart-${i}`}
          className="absolute opacity-8"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            width: `${12 + Math.random() * 16}px`,
            height: `${8 + Math.random() * 12}px`,
            animation: `drift 20s linear infinite`,
            animationDelay: `${Math.random() * 15}s`
          }}
        >
          <svg viewBox="0 0 24 16" className="w-full h-full">
            {i % 3 === 0 && Array.from({ length: 4 }, (_, j) => (
              <rect 
                key={j}
                x={j * 5 + 1} 
                y={12 - Math.random() * 8} 
                width="2" 
                height={4 + Math.random() * 8} 
                fill={neonColors[j % neonColors.length]}
              />
            ))}
            {i % 3 === 1 && (
              <circle 
                cx="12" 
                cy="8" 
                r="6" 
                fill="none" 
                stroke={neonColors[i % neonColors.length]} 
                strokeWidth="1"
              />
            )}
            {i % 3 === 2 && (
              <path 
                d="M2,14 Q8,6 14,10 Q20,4 22,8" 
                stroke={neonColors[i % neonColors.length]} 
                strokeWidth="1" 
                fill="none"
              />
            )}
          </svg>
        </div>
      ))}

      {/* Subtle gradient overlays */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-500/3 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-purple-500/3 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/3 to-pink-500/3 rounded-full blur-3xl" />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(90deg); }
          50% { transform: translateY(-6px) rotate(180deg); }
          75% { transform: translateY(-3px) rotate(270deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes drift {
          0% { transform: translateX(0px); }
          50% { transform: translateX(10px); }
          100% { transform: translateX(0px); }
        }
      `}</style>
    </div>
  );
};

export default Background3D;