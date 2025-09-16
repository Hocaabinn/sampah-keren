import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Button from '../../../../components/ui/Button';

const ChartContainer = ({ title, type, data, config, onExport, className = '' }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const colors = ['#2D5A3D', '#4A7C59', '#7BA05B', '#059669', '#D97706', '#DC2626'];

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)', 
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            {config?.lines?.map((line, index) => (
              <Line
                key={line?.dataKey}
                type="monotone"
                dataKey={line?.dataKey}
                stroke={colors?.[index % colors?.length]}
                strokeWidth={2}
                dot={{ fill: colors?.[index % colors?.length], strokeWidth: 2, r: 4 }}
                name={line?.name}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)', 
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            {config?.bars?.map((bar, index) => (
              <Bar
                key={bar?.dataKey}
                dataKey={bar?.dataKey}
                fill={colors?.[index % colors?.length]}
                name={bar?.name}
                radius={[2, 2, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors?.[index % colors?.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );

      default:
        return <div className="flex items-center justify-center h-64 text-muted-foreground">Chart type not supported</div>;
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-subtle ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconSize={16}
            onClick={onExport}
          >
            Export
          </Button>
          <Button
            variant="ghost"
            size="icon"
            iconName={isFullscreen ? "Minimize2" : "Maximize2"}
            iconSize={16}
            onClick={() => setIsFullscreen(!isFullscreen)}
          />
        </div>
      </div>

      <div className="p-4">
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                iconSize={20}
                onClick={() => setIsFullscreen(false)}
              />
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartContainer;