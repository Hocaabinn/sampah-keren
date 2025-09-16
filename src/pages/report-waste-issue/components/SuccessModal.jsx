import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, onClose, reportData }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedResponse = (urgency) => {
    const timeframes = {
      emergency: '2-4 hours',
      high: '24-48 hours',
      medium: '2-3 business days',
      low: '3-5 business days'
    };
    return timeframes?.[urgency] || '2-3 business days';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card rounded-lg border border-border shadow-modal max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Success Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-foreground text-center mb-2">
          Laporan Berhasil Dikirim
          </h2>
          
          <p className="text-muted-foreground text-center mb-6">
          Terima kasih telah membantu menjaga kebersihan. Laporan Anda telah diterima dan akan ditinjau oleh tim kami.
          </p>

          {/* Report Details */}
          <div className="space-y-4 mb-6">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Report ID</span>
                <span className="font-mono text-sm font-bold text-foreground">
                  {reportData?.id}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Submitted:</span>
                  <span className="text-foreground">
                    {formatDate(reportData?.submittedAt)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issue Type:</span>
                  <span className="text-foreground">
                    {reportData?.wasteType?.split('-')?.map(word => 
                      word?.charAt(0)?.toUpperCase() + word?.slice(1)
                    )?.join(' ')}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority:</span>
                  <span className="text-foreground">
                    {reportData?.urgency?.charAt(0)?.toUpperCase() + reportData?.urgency?.slice(1)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Response:</span>
                  <span className="text-foreground">
                    {getEstimatedResponse(reportData?.urgency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-2 flex items-center">
                <Icon name="Info" size={16} className="text-primary mr-2" />
                What happens next?
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Our team will review your report within the estimated timeframe</li>
                <li>• You'll receive email updates on the progress</li>
                <li>• Check your profile for real-time status updates</li>
                <li>• We may contact you if additional information is needed</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              size="lg"
              iconName="FileText"
              iconPosition="left"
              onClick={onClose}
              className="flex-1"
            >
              View My Reports
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              iconName="Plus"
              iconPosition="left"
              onClick={() => {
                onClose();
                // Could trigger a new report form
              }}
              className="flex-1"
            >
              Submit Another
            </Button>
          </div>

          {/* Emergency Notice */}
          {reportData?.urgency === 'emergency' && (
            <div className="mt-4 bg-error/10 border border-error/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-error">Emergency Report</p>
                  <p className="text-muted-foreground">
                    For immediate safety concerns, please also contact emergency services at 911.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;