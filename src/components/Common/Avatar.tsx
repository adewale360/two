import React from 'react';
import { User, GraduationCap, Users, School, BookOpen } from 'lucide-react';

interface AvatarProps {
  name: string;
  type: 'student' | 'lecturer' | 'admin' | 'department';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showIcon?: boolean;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  type, 
  size = 'md', 
  showIcon = false,
  className = '' 
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'student':
        return 'avatar-student';
      case 'lecturer':
        return 'avatar-lecturer';
      case 'admin':
        return 'avatar-admin';
      case 'department':
        return 'avatar-department';
      default:
        return 'avatar-gradient';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'student':
        return <GraduationCap className="h-4 w-4" />;
      case 'lecturer':
        return <Users className="h-4 w-4" />;
      case 'admin':
        return <User className="h-4 w-4" />;
      case 'department':
        return <School className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const sizeClass = `avatar-${size}`;

  return (
    <div className={`avatar ${sizeClass} ${getTypeStyles()} ${className}`}>
      {showIcon ? (
        <div className="text-white">
          {getIcon()}
        </div>
      ) : (
        <span className="font-semibold text-white">
          {getInitials(name)}
        </span>
      )}
    </div>
  );
};

export default Avatar;