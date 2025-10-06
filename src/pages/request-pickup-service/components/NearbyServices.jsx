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

  
};

export default NearbyServices;