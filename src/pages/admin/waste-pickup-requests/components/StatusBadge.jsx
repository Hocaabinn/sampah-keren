import React from 'react';
import Icon from '../../../../components/AppIcon';

const StatusBadge = ({ status, size = 'default' }) => {
  const statusConfig = {
    pending: {
      label: 'Pending',
      icon: 'Clock',
      className: 'bg-warning/10 text-warning border-warning/20'
    },
    scheduled: {
      label: 'Scheduled',
      icon: 'Calendar',
      className: 'bg-primary/10 text-primary border-primary/20'
    },
    'in-progress': {
      label: 'In Progress',
      icon: 'Truck',
      className: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    completed: {
      label: 'Completed',
      icon: 'CheckCircle',
      className: 'bg-success/10 text-success border-success/20'
    },
    cancelled: {
      label: 'Cancelled',
      icon: 'XCircle',
      className: 'bg-destructive/10 text-destructive border-destructive/20'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.pending;
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

export default StatusBadge;