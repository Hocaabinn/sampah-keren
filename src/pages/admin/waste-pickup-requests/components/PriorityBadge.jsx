import React from 'react';
import Icon from '../../../../components/AppIcon';

const PriorityBadge = ({ priority, size = 'default' }) => {
  const priorityConfig = {
    low: {
      label: 'Low',
      icon: 'ArrowDown',
      className: 'bg-gray-100 text-gray-700 border-gray-200'
    },
    medium: {
      label: 'Medium',
      icon: 'Minus',
      className: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    },
    high: {
      label: 'High',
      icon: 'ArrowUp',
      className: 'bg-orange-100 text-orange-700 border-orange-200'
    },
    urgent: {
      label: 'Urgent',
      icon: 'AlertTriangle',
      className: 'bg-red-100 text-red-700 border-red-200'
    }
  };

  const config = priorityConfig?.[priority] || priorityConfig?.medium;
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-full border font-medium
      ${config?.className}
      ${sizeClasses}
    `}>
      <Icon name={config?.icon} size={size === 'sm' ? 12 : 14} />
      {config?.label}
    </span>
  );
};

export default PriorityBadge;