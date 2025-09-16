import React from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const ServiceScheduleCard = ({ title, date, routes, onViewAll }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'in-progress':
        return 'bg-warning text-warning-foreground';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAll}
          iconName="ExternalLink"
          iconSize={16}
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {routes?.map((route) => (
          <div key={route?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(route?.status)}`}>
                <Icon name={getStatusIcon(route?.status)} size={16} />
              </div>
              <div>
                <p className="font-medium text-foreground">{route?.name}</p>
                <p className="text-sm text-muted-foreground">{route?.area}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{route?.time}</p>
              <p className="text-xs text-muted-foreground">{route?.staff}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceScheduleCard;