import React from 'react';
import { Calendar, User } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import type { News } from '../../types';

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  const categoryColors = {
    announcement: 'from-blue-500 to-blue-600',
    academic: 'from-green-500 to-green-600',
    event: 'from-purple-500 to-purple-600',
    achievement: 'from-orange-500 to-orange-600'
  };

  return (
    <GlassCard variant="gradient" className="p-6 hover:scale-105 transition-transform">
      <div className="flex items-start justify-between mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryColors[news.category]}`}>
          {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
        </span>
        <div className="flex items-center text-xs text-gray-400">
          <Calendar size={12} className="mr-1" />
          {new Date(news.date).toLocaleDateString()}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">
        {news.title}
      </h3>
      
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
        {news.content}
      </p>
      
      <div className="flex items-center text-xs text-gray-400">
        <User size={12} className="mr-1" />
        {news.author}
      </div>
    </GlassCard>
  );
}