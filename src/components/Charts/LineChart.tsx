import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface LineChartProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  title?: string;
  color?: string;
}

const CustomLineChart: React.FC<LineChartProps> = ({ 
  data, 
  dataKey, 
  xAxisKey, 
  title,
  color = '#10b981' 
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
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey={xAxisKey} 
            stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            fontSize={10}
          />
          <YAxis 
            stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
            fontSize={10}
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
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            fill={`url(#gradient-${dataKey})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;