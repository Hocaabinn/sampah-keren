import React from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const ScheduleDetailsPanel = ({ 
  selectedDate, 
  schedules, 
  onScheduleEdit, 
  onScheduleDelete, 
  onCreateSchedule 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10 border-success/20';
      case 'in-progress': return 'text-warning bg-warning/10 border-warning/20';
      case 'pending': return 'text-muted-foreground bg-muted/10 border-muted/20';
      case 'cancelled': return 'text-error bg-error/10 border-error/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getWasteTypeIcon = (type) => {
    switch (type) {
      case 'organic': return 'Leaf';
      case 'recyclable': return 'Recycle';
      case 'hazardous': return 'AlertTriangle';
      case 'general': return 'Trash2';
      default: return 'Package';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getScheduleStats = () => {
    const total = schedules?.length;
    const completed = schedules?.filter(s => s?.status === 'completed')?.length;
    const inProgress = schedules?.filter(s => s?.status === 'in-progress')?.length;
    const pending = schedules?.filter(s => s?.status === 'pending')?.length;

    return { total, completed, inProgress, pending };
  };

  const stats = getScheduleStats();

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
            Detail Jadwal
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatDate(selectedDate)}
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => onCreateSchedule(selectedDate)}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Add Schedule
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{stats?.total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{stats?.completed}</div>
            <div className="text-xs text-muted-foreground">Selesai</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{stats?.inProgress}</div>
            <div className="text-xs text-muted-foreground">Sedang Diproses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">{stats?.pending}</div>
            <div className="text-xs text-muted-foreground">Tertunda</div>
          </div>
        </div>
      </div>
      {/* Schedule List */}
      <div className="max-h-96 overflow-y-auto">
        {schedules?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">Tidak Ada Jadwal</h4>
            <p className="text-sm text-muted-foreground mb-4">
            Tidak ada jadwal penjemputan untuk tanggal ini.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {schedules?.sort((a, b) => a?.time?.localeCompare(b?.time))?.map(schedule => (
                <div
                  key={schedule?.id}
                  className="p-4 border border-border rounded-lg hover:shadow-subtle transition-micro"
                >
                  {/* Schedule Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Icon 
                          name={getWasteTypeIcon(schedule?.wasteType)} 
                          size={20} 
                          className="text-primary" 
                        />
                        <h4 className="font-medium text-foreground">{schedule?.route}</h4>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        getStatusColor(schedule?.status)
                      }`}>
                        {schedule?.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onScheduleEdit(schedule)}
                        iconName="Edit2"
                        iconSize={16}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onScheduleDelete(schedule)}
                        iconName="Trash2"
                        iconSize={16}
                        className="text-error hover:text-error"
                      />
                    </div>
                  </div>

                  {/* Schedule Details Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{schedule?.time} ({schedule?.duration})</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="User" size={14} />
                      <span>{schedule?.staff}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Truck" size={14} />
                      <span>{schedule?.vehicle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Flag" size={14} className={getPriorityColor(schedule?.priority)} />
                      <span className={`capitalize ${getPriorityColor(schedule?.priority)}`}>
                        {schedule?.priority} Priority
                      </span>
                    </div>
                  </div>

                  {/* Route Information */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Icon name="MapPin" size={14} />
                      <span>Route Details</span>
                    </div>
                    <div className="text-sm text-foreground">
                      <div className="flex items-center justify-between">
                        <span>Locations: {schedule?.locations}</span>
                        <span>Est. Distance: {schedule?.estimatedDistance}</span>
                      </div>
                      {schedule?.notes && (
                        <div className="mt-2 p-2 bg-muted rounded text-xs">
                          <Icon name="MessageSquare" size={12} className="inline mr-1" />
                          {schedule?.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar for In-Progress Items */}
                  {schedule?.status === 'in-progress' && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{schedule?.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${schedule?.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
      {/* Footer Actions */}
      {schedules?.length > 0 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {schedules?.length} schedule{schedules?.length !== 1 ? 's' : ''} for this date
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={16}
              >
                Optimize Routes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleDetailsPanel;