import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'gradient' | 'dark';
}

export function GlassCard({ children, className = '', onClick, variant = 'default' }: GlassCardProps) {
  const variants = {
    default: 'backdrop-blur-xl bg-white/5 border border-white/10',
    gradient: 'backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20',
    dark: 'backdrop-blur-xl bg-black/20 border border-white/10'
  };

  return (
    <div
      className={`
        ${variants[variant]}
        rounded-2xl shadow-2xl
        transition-all duration-300 ease-in-out
        hover:bg-white/10 hover:border-white/20
        hover:shadow-3xl hover:scale-[1.02]
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}