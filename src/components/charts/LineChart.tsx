import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: Array<{ name: string; value: number; }>;
  title: string;
  color?: string;
}

export function CustomLineChart({ data, title, color = '#8B5CF6' }: LineChartProps) {
  return (
    <div className="h-80">
      {title && <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              color: '#fff'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={3} 
            dot={{ fill: color, r: 6, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 8, stroke: color, strokeWidth: 2, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}