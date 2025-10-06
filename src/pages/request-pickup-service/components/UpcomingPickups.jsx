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

  
};

export default UpcomingPickups;