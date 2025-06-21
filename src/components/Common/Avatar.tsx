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

  // Random avatar images from the provided files
  const avatarImages = [
    '/#90s #Style #inspiration #blackboy #anime….jpeg',
    '/#marvel _ #gwenstacy _ #spiderman _ #icon….jpeg',
    '/7dfe80c2-4964-4470-ba6b-d034abc03a49.jpeg',
    '/5537f926-28d7-4350-ba60-c74f89f3fc63.jpeg',
    '/a6765ca6-319f-4212-b29e-996cc6ecee03.jpeg'
  ];

  // Generate a consistent random image based on name hash
  const getRandomAvatar = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      const char = name.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return avatarImages[Math.abs(hash) % avatarImages.length];
  };

  const sizeClass = `avatar-${size}`;
  const randomImage = getRandomAvatar(name);

  return (
    <div className={`avatar ${sizeClass} ${getTypeStyles()} ${className}`}>
      {showIcon ? (
        <div className="text-white">
          {getIcon()}
        </div>
      ) : (
        <img 
          src={randomImage} 
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<span class="font-semibold text-white">${getInitials(name)}</span>`;
            }
          }}
        />
      )}
    </div>
  );
};

export default Avatar;