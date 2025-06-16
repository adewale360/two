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
    <div className="chart-container">
      {title && (
        <h3 className="compact-header text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 10, right: 15, left: 10, bottom: 5 }} barCategoryGap="5%">
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey={xAxisKey} 
            stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            fontSize={10}
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            fontSize={10}
            tick={{ fontSize: 10 }}
            width={30}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              borderRadius: '6px',
              color: theme === 'dark' ? '#f9fafb' : '#111827',
              fontSize: '12px'
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