import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NearbyServices = ({ nearbyServices, onGetDirections }) => {
  const getServiceTypeIcon = (type) => {
    switch (type) {
      case 'drop-off':
        return 'MapPin';
      case 'recycling':
        return 'Recycle';
      case 'hazardous':
        return 'AlertTriangle';
      case 'bulk':
        return 'Package';
      default:
        return 'MapPin';
    }
  };

  const getServiceTypeColor = (type) => {
    switch (type) {
      case 'drop-off':
        return 'text-primary bg-primary/10';
      case 'recycling':
        return 'text-success bg-success/10';
      case 'hazardous':
        return 'text-warning bg-warning/10';
      case 'bulk':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${(distance * 1000)?.toFixed(0)}m`;
    }
    return `${distance?.toFixed(1)}km`;
  };

  const formatHours = (hours) => {
    return `${hours?.open} - ${hours?.close}`;
  };

  const isOpenNow = (hours) => {
    const now = new Date();
    const currentHour = now?.getHours();
    const openHour = parseInt(hours?.open?.split(':')?.[0]);
    const closeHour = parseInt(hours?.close?.split(':')?.[0]);
    
    return currentHour >= openHour && currentHour < closeHour;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
          <Icon name="MapPin" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Nearby Services</h2>
          <p className="text-sm text-muted-foreground">Drop-off points and facilities</p>
        </div>
      </div>
      <div className="space-y-4">
        {nearbyServices?.map((service) => (
          <div
            key={service?.id}
            className="border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${getServiceTypeColor(service?.type)}`}>
                    <Icon 
                      name={getServiceTypeIcon(service?.type)} 
                      size={16} 
                      color="currentColor" 
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-foreground">{service?.name}</h3>
                    <p className="text-sm text-muted-foreground">{service?.type?.charAt(0)?.toUpperCase() + service?.type?.slice(1)} Point</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Navigation" size={14} />
                    <span>{formatDistance(service?.distance)} away</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span className={isOpenNow(service?.hours) ? 'text-success' : 'text-error'}>
                      {isOpenNow(service?.hours) ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-2">{service?.address}</p>
                
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Hours: </span>
                  {formatHours(service?.hours)}
                </div>
              </div>
            </div>

            {service?.acceptedWaste && service?.acceptedWaste?.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium text-foreground mb-2">Accepted Waste Types:</p>
                <div className="flex flex-wrap gap-2">
                  {service?.acceptedWaste?.map((waste, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                    >
                      {waste}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-2">
                {service?.rating && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} color="var(--color-warning)" />
                    <span className="text-sm font-medium text-foreground">{service?.rating}</span>
                    <span className="text-sm text-muted-foreground">({service?.reviews} reviews)</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onGetDirections(service)}
                  iconName="Navigation"
                  iconPosition="left"
                >
                  Directions
                </Button>
                
                {service?.phone && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Phone"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Call
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Service Area Map */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Map" size={18} color="var(--color-primary)" />
          <span>Service Area Coverage</span>
        </h3>
        
        <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Service Area Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7128,-74.0060&z=12&output=embed"
            className="border-0"
          />
        </div>
        
        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={14} />
            <span>Pickup services available within the highlighted area. Drop-off points shown with markers.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyServices;