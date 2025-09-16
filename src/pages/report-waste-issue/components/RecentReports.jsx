import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentReports = ({ reports, onDelete }) => {
  const [expandedReport, setExpandedReport] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning/10 text-warning border-warning/20',
      'in-progress': 'bg-secondary/10 text-secondary border-secondary/20',
      resolved: 'bg-success/10 text-success border-success/20',
      rejected: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground border-border';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: 'Clock',
      'in-progress': 'Loader',
      resolved: 'CheckCircle',
      rejected: 'XCircle'
    };
    return icons?.[status] || 'AlertCircle';
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      low: 'text-success',
      medium: 'text-warning',
      high: 'text-error',
      emergency: 'text-error font-bold'
    };
    return colors?.[urgency] || 'text-muted-foreground';
  };

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

  const toggleExpanded = (reportId) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  if (!reports || reports?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
          <Icon name="FileText" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Reports Yet</h3>
        <p className="text-muted-foreground">
          Your submitted waste issue reports will appear here for tracking and updates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Laporan Terbaru Anda</h2>
        <span className="text-sm text-muted-foreground">
          {reports?.length} Laporan{reports?.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        {reports?.map((report) => (
          <div
            key={report?.id}
            className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-card transition-smooth"
          >
            {/* Report Header */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-mono text-sm font-medium text-foreground">
                      {report?.id}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        report?.status
                      )}`}
                    >
                      <Icon
                        name={getStatusIcon(report?.status)}
                        size={12}
                        className="mr-1"
                      />
                      {report?.status
                        ?.charAt(0)
                        ?.toUpperCase() +
                        report?.status?.slice(1)?.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Submitted {formatDate(report?.submittedAt)}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Expand button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={
                      expandedReport === report?.id ? 'ChevronUp' : 'ChevronDown'
                    }
                    onClick={() => toggleExpanded(report?.id)}
                  />

                  {/* Delete button */}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash"
                      className="text-error hover:text-error"
                      onClick={() => onDelete(report?.id)}
                    />
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
                  <Icon name="AlertTriangle" size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">
                    {report?.wasteType
                      ?.split('-')
                      ?.map(
                        (word) =>
                          word?.charAt(0)?.toUpperCase() + word?.slice(1)
                      )
                      ?.join(' ')}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {report?.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{report?.location?.address || 'Location provided'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="AlertCircle" size={12} />
                      <span className={getUrgencyColor(report?.urgency)}>
                        {report?.urgency?.charAt(0)?.toUpperCase() +
                          report?.urgency?.slice(1)}{' '}
                        Priority
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedReport === report?.id && (
              <div className="border-t border-border bg-muted/20 p-4 space-y-4">
                {/* Full Description */}
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Full Description
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {report?.description}
                  </p>
                </div>

                {/* Location Details */}
                {report?.location && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Location Details
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>{report?.location?.address}</p>
                      <p>
                        Coordinates: {report?.location?.lat?.toFixed(4)},{' '}
                        {report?.location?.lng?.toFixed(4)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Photos */}
                {report?.photos && report?.photos?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Photo ({report?.photos?.length})
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {report?.photos?.map((photo, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-muted rounded-md overflow-hidden"
                        >
                          <Image
                            src={photo?.url}
                            alt={`Report photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Contact Information
                  </h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Name: {report?.contactInfo?.name}</p>
                    <p>Email: {report?.contactInfo?.email}</p>
                    {report?.contactInfo?.phone && (
                      <p>Phone: {report?.contactInfo?.phone}</p>
                    )}
                  </div>
                </div>

                {/* Status Updates */}
                {report?.statusUpdates && report?.statusUpdates?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Status Updates
                    </h4>
                    <div className="space-y-2">
                      {report?.statusUpdates?.map((update, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-2 text-sm"
                        >
                          <Icon
                            name="Clock"
                            size={14}
                            className="text-muted-foreground mt-0.5"
                          />
                          <div>
                            <p className="text-foreground">{update?.message}</p>
                            <p className="text-muted-foreground text-xs">
                              {formatDate(update?.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReports;
