import React from 'react';
import { School } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${className} bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center`}>
      <School className="h-5 w-5 text-white" />
    </div>
  );
};

export default Logo;