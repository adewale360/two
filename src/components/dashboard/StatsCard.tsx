import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  gradient?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'neutral',
  gradient = 'from-purple-500 to-pink-500'
}: StatsCardProps) {
  const changeColor = {
    increase: 'text-green-400',
    decrease: 'text-red-400',
    neutral: 'text-gray-400'
  };

  return (
    <GlassCard variant="gradient" className="p-6 group hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white mb-2">{value}</p>
          {change && (
            <p className={`text-sm ${changeColor[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-4 bg-gradient-to-r ${gradient} rounded-xl shadow-lg group-hover:shadow-xl transition-all`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </GlassCard>
  );
}