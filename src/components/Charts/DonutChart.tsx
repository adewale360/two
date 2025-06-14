import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface DonutChartProps {
  data: any[];
  title?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
  const { theme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-gray-800 compact-card rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {title && (
        <h3 className="compact-header text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              borderRadius: '6px',
              color: theme === 'dark' ? '#f9fafb' : '#111827',
              fontSize: '12px'
            }}
          />
          <Legend 
            wrapperStyle={{
              color: theme === 'dark' ? '#f9fafb' : '#111827',
              fontSize: '11px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;