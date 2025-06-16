import React from 'react';

const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Minimal subtle background elements */}
      <div className="absolute top-10 left-10 w-16 h-16 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
          <polygon points="50,10 90,90 10,90" fill="currentColor" />
        </svg>
      </div>
      
      <div className="absolute top-32 right-20 w-12 h-12 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-purple-500">
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
      </div>
      
      <div className="absolute bottom-20 left-32 w-20 h-20 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-500">
          <rect x="20" y="20" width="60" height="60" fill="currentColor" transform="rotate(45 50 50)" />
        </svg>
      </div>
      
      {/* Subtle gradient overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/2 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/2 to-transparent rounded-full blur-3xl" />
    </div>
  );
};

export default Background3D;