import React, { useState } from 'react';
import { User, GraduationCap, Users, School, Camera } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AvatarProps {
  name: string;
  type: 'student' | 'lecturer' | 'admin' | 'department';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showIcon?: boolean;
  className?: string;
  imageUrl?: string;
  editable?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  type, 
  size = 'md', 
  showIcon = false,
  className = '',
  imageUrl,
  editable = false
}) => {
  const { updateUserProfile } = useAuth();
  const [isHovering, setIsHovering] = useState(false);
  const [uploading, setUploading] = useState(false);
  
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

  // Pexels stock photos
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    
    try {
      // In a real app, you would upload to storage here
      // For demo, we'll use a FileReader to get a data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const newAvatarUrl = event.target?.result as string;
        
        // Update the user profile with the new avatar URL
        if (updateUserProfile) {
          updateUserProfile({ avatarUrl: newAvatarUrl });
        }
        
        setUploading(false);
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setUploading(false);
    }
  };

  const sizeClass = `avatar-${size}`;
  const displayImage = imageUrl || getRandomAvatar(name);

  return (
    <div 
      className={`avatar ${sizeClass} ${getTypeStyles()} ${className} relative`}
      onMouseEnter={() => editable && setIsHovering(true)}
      onMouseLeave={() => editable && setIsHovering(false)}
    >
      {showIcon ? (
        <div className="text-white">
          {getIcon()}
        </div>
      ) : (
        <>
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
          
          {editable && isHovering && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
              <label className="cursor-pointer text-white text-xs font-medium flex items-center">
                <Camera className="h-3 w-3 mr-1" />
                {uploading ? 'Uploading...' : 'Change'}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Avatar;