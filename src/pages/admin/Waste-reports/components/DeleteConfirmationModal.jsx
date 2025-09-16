import React from 'react';
import Button from '../../../../components/ui/Button';
import Icon from '../../../../components/AppIcon';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, report, isDeleting }) => {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-error" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Delete Waste Report
              </h3>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <p className="text-sm text-foreground">
              Are you sure you want to delete this waste report? This will permanently remove:
            </p>
            
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Report ID:</span>
                <span className="font-medium text-foreground">{report?.reportId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Collection Date:</span>
                <span className="font-medium text-foreground">
                  {new Date(report.collectionDate)?.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Route:</span>
                <span className="font-medium text-foreground">
                  {report?.route?.replace('route-', 'Route ')?.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Waste:</span>
                <span className="font-medium text-foreground">
                  {Object.values(report?.wasteCategories)?.reduce((sum, cat) => sum + cat?.collected, 0)?.toFixed(1)} kg
                </span>
              </div>
            </div>

            <div className="bg-error/5 border border-error/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-error mb-1">Data Retention Warning</p>
                  <p className="text-error/80">
                    All collection data, waste categorization, staff assignments, and photo documentation will be permanently deleted. This may affect historical analytics and compliance reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              loading={isDeleting}
              iconName="Trash2"
              iconSize={16}
            >
              Delete Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;