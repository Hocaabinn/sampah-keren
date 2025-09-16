import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ActivityHistory = ({ activities }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'reports', label: 'Waste Reports' },
    { value: 'pickups', label: 'Pickup Requests' },
    { value: 'education', label: 'Education Content' },
    { value: 'achievements', label: 'Achievements' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'type', label: 'By Type' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'report': return 'AlertTriangle';
      case 'pickup': return 'Truck';
      case 'education': return 'BookOpen';
      case 'achievement': return 'Award';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'report': return 'text-primary';
      case 'pickup': return 'text-secondary';
      case 'education': return 'text-accent';
      case 'achievement': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success/10 text-success', label: 'Completed' },
      pending: { color: 'bg-warning/10 text-warning', label: 'Pending' },
      in_progress: { color: 'bg-secondary/10 text-secondary', label: 'In Progress' },
      cancelled: { color: 'bg-error/10 text-error', label: 'Cancelled' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const filteredActivities = activities?.filter(activity => filter === 'all' || activity?.type === filter?.slice(0, -1))?.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'type') return a?.type?.localeCompare(b?.type);
      return 0;
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Activity History</h2>
          <p className="text-sm text-muted-foreground">Your complete waste management activity timeline</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select
            options={filterOptions}
            value={filter}
            onChange={setFilter}
            placeholder="Filter activities"
            className="w-40"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
            className="w-36"
          />
        </div>
      </div>
      {filteredActivities?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Activities Found</h3>
          <p className="text-muted-foreground mb-4">No activities match your current filter criteria.</p>
          <Button variant="outline" onClick={() => setFilter('all')}>
            Show All Activities
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredActivities?.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-smooth">
              <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}>
                <Icon 
                  name={getActivityIcon(activity?.type)} 
                  size={18} 
                  className={getActivityColor(activity?.type)} 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">
                      {activity?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {activity?.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={12} />
                        <span>{formatDate(activity?.date)}</span>
                      </div>
                      {activity?.location && (
                        <div className="flex items-center gap-1">
                          <Icon name="MapPin" size={12} />
                          <span>{activity?.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {activity?.status && getStatusBadge(activity?.status)}
                    {activity?.points && (
                      <div className="text-xs font-medium text-accent">
                        +{activity?.points} pts
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredActivities?.length > 10 && (
            <div className="text-center pt-4">
              <Button variant="outline">
                Load More Activities
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityHistory;