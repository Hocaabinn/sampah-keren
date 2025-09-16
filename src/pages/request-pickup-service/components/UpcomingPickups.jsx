import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingPickups = ({ upcomingPickups, onModify, onCancel }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeSlot) => {
    const timeMap = {
      'morning': '8:00 AM - 12:00 PM',
      'afternoon': '12:00 PM - 4:00 PM',
      'evening': '4:00 PM - 8:00 PM'
    };
    return timeMap?.[timeSlot] || timeSlot;
  };

  const getWasteTypeLabel = (type) => {
    const typeMap = {
      'household': 'Household Waste',
      'recyclable': 'Recyclable Materials',
      'organic': 'Organic/Compost',
      'electronic': 'Electronic Waste',
      'hazardous': 'Hazardous Materials',
      'bulk': 'Bulk Items'
    };
    return typeMap?.[type] || type;
  };

  const getDaysUntilPickup = (dateString) => {
    const pickupDate = new Date(dateString);
    const today = new Date();
    const diffTime = pickupDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const getUrgencyColor = (dateString) => {
    const daysUntil = getDaysUntilPickup(dateString);
    if (daysUntil === 'Today') return 'text-error bg-error/10 border-error/20';
    if (daysUntil === 'Tomorrow') return 'text-warning bg-warning/10 border-warning/20';
    return 'text-primary bg-primary/10 border-primary/20';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="Calendar" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Penjemputan Berikutnya 🚛</h2>
          <p className="text-sm text-muted-foreground"></p>
        </div>
      </div>
      {upcomingPickups?.length === 0 ? (
        <div className="text-center py-8">
          <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
            <Icon name="Calendar" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Upcoming Pickups</h3>
          <p className="text-muted-foreground">Schedule a pickup to see it here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingPickups?.map((pickup) => (
            <div
              key={pickup?.id}
              className="border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex items-center px-4.5 py-0.5 rounded-full text-xs font-medium border ${getUrgencyColor(pickup?.date)}`}>
                      <Icon name="Clock" size={12} className="mr-1" />
                      {getDaysUntilPickup(pickup?.date)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Request #{pickup?.id}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    {formatDate(pickup?.date)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {formatTime(pickup?.timeSlot)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                    <Icon name="Trash2" size={16} color="var(--color-muted-foreground)" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {getWasteTypeLabel(pickup?.wasteType)}
                    </p>
                    <p className="text-xs text-muted-foreground">{pickup?.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                    <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground truncate">{pickup?.address}</p>
                  </div>
                </div>
              </div>

              {pickup?.specialInstructions && (
                <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-1">Catatan Tambahan:</p>
                  <p className="text-sm text-muted-foreground">{pickup?.specialInstructions}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Info" size={14} />
                  <span>Notifikasi akan dikirim Sekiatr 1 jam sebelum jadwal </span>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onModify(pickup?.id)}
                    iconName="Edit"
                    iconPosition="left"
                  >
                    Modify
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onCancel(pickup?.id)}
                    iconName="X"
                    iconPosition="left"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingPickups;