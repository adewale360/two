import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface BarChartProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  title?: string;
  color?: string;
}

const CustomBarChart: React.FC<BarChartProps> = ({ 
  data, 
  dataKey, 
  xAxisKey, 
  title,
  color = '#3b82f6' 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-gray-800 compact-card rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-sm">
      {title && (
        <h3 className="compact-header text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 5, bottom: 5 }} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey={xAxisKey} 
            stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            fontSize={9}
            tick={{ fontSize: 9 }}
          />
          <YAxis 
            stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            fontSize={9}
            tick={{ fontSize: 9 }}
            width={25}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              borderRadius: '6px',
              color: theme === 'dark' ? '#f9fafb' : '#111827',
              fontSize: '11px'
            }}
          />
          <Bar 
            dataKey={dataKey} 
            fill={color} 
            radius={[1, 1, 0, 0]} 
            maxBarSize={6}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;