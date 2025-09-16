import React from 'react';
import Icon from '../../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, description, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle hover-lift transition-micro">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={icon} size={20} className="text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>

        {change && (
          <div className={`flex items-center gap-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">7-day trend</span>
            <div className="flex items-center gap-1">
              {trend?.map((point, index) => (
                <div
                  key={index}
                  className={`w-1 h-6 rounded-full ${
                    point > 50 ? 'bg-success' : point > 25 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ height: `${Math.max(point / 2, 8)}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;