import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PickupHistory = ({ requests, onViewAll }) => {
  const [expandedRequest, setExpandedRequest] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'in-progress':
        return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'cancelled':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Clock';
      case 'in-progress':
        return 'Truck';
      case 'completed':
        return 'CheckCircle';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
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

  const toggleExpanded = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  // Show only recent requests (limit to 3 for initial view)
  const displayRequests = requests?.slice(0, 3);

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
            <Icon name="History" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Pickup History</h2>
            <p className="text-sm text-muted-foreground">Your recent pickup requests</p>
          </div>
        </div>
        
        {requests?.length > 3 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onViewAll}
            iconName="ExternalLink"
            iconPosition="right"
          >
            View All
          </Button>
        )}
      </div>
      {displayRequests?.length === 0 ? (
        <div className="text-center py-8">
          <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
            <Icon name="Truck" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Pickup History</h3>
          <p className="text-muted-foreground">Your pickup requests will appear here once you schedule them.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayRequests?.map((request) => (
            <div
              key={request?.id}
              className="border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(request?.status)}`}>
                      <Icon 
                        name={getStatusIcon(request?.status)} 
                        size={12} 
                        className="mr-1" 
                      />
                      {request?.status?.charAt(0)?.toUpperCase() + request?.status?.slice(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Requested on {formatDate(request?.requestDate)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Pickup Date</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(request?.date)} • {formatTime(request?.timeSlot)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Waste Type</p>
                      <p className="text-sm text-muted-foreground">
                        {getWasteTypeLabel(request?.wasteType)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} />
                    <span className="truncate">{request?.address}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(request?.id)}
                  iconName={expandedRequest === request?.id ? "ChevronUp" : "ChevronDown"}
                  className="ml-4"
                >
                  {expandedRequest === request?.id ? 'Less' : 'More'}
                </Button>
              </div>

              {expandedRequest === request?.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Quantity</p>
                      <p className="text-sm text-muted-foreground">{request?.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Request ID</p>
                      <p className="text-sm text-muted-foreground font-mono">#{request?.id}</p>
                    </div>
                  </div>
                  
                  {request?.specialInstructions && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Special Instructions</p>
                      <p className="text-sm text-muted-foreground">{request?.specialInstructions}</p>
                    </div>
                  )}

                  {request?.status === 'completed' && (
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Icon name="Star" size={16} color="var(--color-warning)" />
                        <span className="text-sm text-muted-foreground">Rate this service</span>
                      </div>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5]?.map((star) => (
                          <button
                            key={star}
                            className="p-1 hover:bg-muted rounded transition-smooth"
                          >
                            <Icon 
                              name="Star" 
                              size={16} 
                              color="var(--color-muted-foreground)"
                              className="hover:text-warning"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PickupHistory;