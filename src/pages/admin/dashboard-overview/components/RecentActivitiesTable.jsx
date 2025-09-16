import React from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const RecentActivitiesTable = ({ activities, onViewAll }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'pickup':
        return 'Truck';
      case 'report':
        return 'FileText';
      case 'staff':
        return 'Users';
      case 'system':
        return 'Settings';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'pickup':
        return 'text-primary';
      case 'report':
        return 'text-success';
      case 'staff':
        return 'text-warning';
      case 'system':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return time?.toLocaleDateString();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Aktivitas Terbaru</h3>
          <p className="text-sm text-muted-foreground">Pembaruan dan operasi sistem terbaru</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAll}
          iconName="ExternalLink"
          iconSize={16}
        >
          Lihat Semua
        </Button>
      </div>
      <div className="divide-y divide-border">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-micro">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity?.title}
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {formatTime(activity?.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{activity?.description}</p>
                {activity?.location && (
                  <div className="flex items-center gap-1 mt-1">
                    <Icon name="MapPin" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity?.location}</span>
                  </div>
                )}
              </div>

              {activity?.status && (
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity?.status === 'completed' ? 'bg-success/10 text-success' :
                  activity?.status === 'pending' ? 'bg-warning/10 text-warning' :
                  activity?.status === 'failed'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
                }`}>
                  {activity?.status}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivitiesTable;