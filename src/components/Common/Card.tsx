import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', action }) => {
  return (
    <div className={`modern-card overflow-hidden ${className}`}>
      {(title || action) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between bg-gray-50 dark:bg-slate-700/50">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;