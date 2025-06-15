import React from 'react';

const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating geometric shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
          <polygon points="50,10 90,90 10,90" fill="currentColor" />
        </svg>
      </div>
      
      <div className="absolute top-32 right-20 w-16 h-16 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-purple-500">
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
      </div>
      
      <div className="absolute bottom-20 left-32 w-24 h-24 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-500">
          <rect x="20" y="20" width="60" height="60" fill="currentColor" transform="rotate(45 50 50)" />
        </svg>
      </div>
      
      <div className="absolute top-1/2 left-1/4 w-12 h-12 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-500">
          <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="currentColor" />
        </svg>
      </div>
      
      <div className="absolute bottom-32 right-1/4 w-18 h-18 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-pink-500">
          <path d="M50,10 L90,30 L90,70 L50,90 L10,70 L10,30 Z" fill="currentColor" />
        </svg>
      </div>
      
      {/* Statistical chart shapes */}
      <div className="absolute top-1/4 right-10 w-32 h-20 opacity-5">
        <svg viewBox="0 0 120 80" className="w-full h-full text-blue-400">
          <rect x="10" y="60" width="8" height="20" fill="currentColor" />
          <rect x="25" y="45" width="8" height="35" fill="currentColor" />
          <rect x="40" y="30" width="8" height="50" fill="currentColor" />
          <rect x="55" y="50" width="8" height="30" fill="currentColor" />
          <rect x="70" y="25" width="8" height="55" fill="currentColor" />
          <rect x="85" y="40" width="8" height="40" fill="currentColor" />
          <rect x="100" y="35" width="8" height="45" fill="currentColor" />
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 left-10 w-28 h-28 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-400">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="20 10" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="15 8" />
          <circle cx="50" cy="50" r="15" fill="currentColor" />
        </svg>
      </div>
      
      <div className="absolute top-3/4 right-1/3 w-24 h-16 opacity-5">
        <svg viewBox="0 0 100 60" className="w-full h-full text-teal-400">
          <path d="M10,50 Q30,20 50,30 T90,25" stroke="currentColor" strokeWidth="3" fill="none" />
          <path d="M10,55 Q30,35 50,40 T90,35" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="10" cy="50" r="2" fill="currentColor" />
          <circle cx="30" cy="35" r="2" fill="currentColor" />
          <circle cx="50" cy="30" r="2" fill="currentColor" />
          <circle cx="70" cy="28" r="2" fill="currentColor" />
          <circle cx="90" cy="25" r="2" fill="currentColor" />
        </svg>
      </div>
      
      {/* Floating dots pattern */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500/5 to-pink-500/5 rounded-full blur-3xl" />
    </div>
  );
};

export default Background3D;