import React from 'react';
import { User, GraduationCap, Users, School } from 'lucide-react';

interface AvatarProps {
  name: string;
  type: 'student' | 'lecturer' | 'admin' | 'department';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showIcon?: boolean;
  className?: string;
  imageUrl?: string;
  imageUrl?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  type, 
  size = 'md', 
  showIcon = false,
  className = '',
  imageUrl
  imageUrl
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

  // Renamed avatar images with clean names
  const avatarImages = [
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
    'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
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
  const displayImage = imageUrl || getRandomAvatar(name);

  return (
    <div className={`avatar ${sizeClass} ${getTypeStyles()} ${className}`}>
      {showIcon ? (
        <div className="text-white">
          {getIcon()}
        </div>
      ) : (
        <img 
          src={displayImage} 
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