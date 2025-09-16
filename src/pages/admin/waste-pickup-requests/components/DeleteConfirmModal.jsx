import React from 'react';
import Button from '../../../../components/ui/Button';
import Icon from '../../../../components/AppIcon';

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  request = null,
  isDeleting = false 
}) => {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Delete Pickup Request</h2>
              <p className="text-sm text-muted-foreground">This action cannot be undone</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <p className="text-foreground">
              Are you sure you want to delete this pickup request? This will permanently remove:
            </p>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="Hash" size={16} className="text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-medium">Request ID:</span> #{request?.requestId}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-medium">Warga:</span> {request?.citizenName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-medium">Alamat:</span> {request?.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Package" size={16} className="text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-medium">Jenis Sampah:</span> {request?.wasteType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-medium">Jadwal:</span> {request?.scheduledDate} at {request?.scheduledTime}
                </span>
              </div>
            </div>

            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="AlertCircle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-destructive">Warning</p>
                  <p className="text-sm text-destructive/80">
                    Deleting this request will remove all associated data, including citizen information, 
                    scheduling details, and any related communications. This action is irreversible.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              If you need to cancel this request instead of deleting it, consider changing its status to "Cancelled" 
              to maintain the record for future reference.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Keep Request
          </Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(request?.id)}
            loading={isDeleting}
            iconName="Trash2"
            iconPosition="left"
          >
            {isDeleting ? 'Deleting...' : 'Delete Request'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;