import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import Select from '../../../../components/ui/Select';

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  staff, 
  onConfirm,
  availableStaff = []
}) => {
  const [reassignTo, setReassignTo] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !staff) return null;

  const hasActiveAssignments = staff?.assignmentStatus === 'assigned' || staff?.assignmentStatus === 'busy';
  
  const reassignmentOptions = availableStaff?.filter(s => s?.id !== staff?.id && s?.status === 'active' && s?.assignmentStatus === 'available')?.map(s => ({
      value: s?.id,
      label: `${s?.name} (${s?.role})`
    }));

  const handleConfirm = async () => {
    if (hasActiveAssignments && !reassignTo) {
      return;
    }

    setLoading(true);
    try {
      await onConfirm(staff?.id, reassignTo);
      onClose();
    } catch (error) {
      console.error('Error deleting staff:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-border">
          <div className="w-10 h-10 bg-error rounded-lg flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Delete Staff Member</h2>
            <p className="text-sm text-muted-foreground">This action cannot be undone</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-error mb-1">Confirm Deletion</h3>
                <p className="text-sm text-foreground">
                  Are you sure you want to delete <strong>{staff?.name}</strong> (ID: {staff?.staffId})?
                </p>
              </div>
            </div>
          </div>

          {hasActiveAssignments && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="Clock" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-warning mb-2">Active Assignments Detected</h3>
                  <p className="text-sm text-foreground mb-3">
                    This staff member has active assignments that need to be reassigned before deletion.
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Current Status:</p>
                    <div className="bg-card rounded p-2 text-sm">
                      <div className="flex justify-between">
                        <span>Assignment Status:</span>
                        <span className="capitalize font-medium">{staff?.assignmentStatus?.replace('_', ' ')}</span>
                      </div>
                      {staff?.currentRoute && (
                        <div className="flex justify-between">
                          <span>Current Route:</span>
                          <span className="font-medium">{staff?.currentRoute}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {reassignmentOptions?.length > 0 ? (
                    <div className="mt-4">
                      <Select
                        label="Reassign to"
                        options={[
                          { value: '', label: 'Select staff member...' },
                          ...reassignmentOptions
                        ]}
                        value={reassignTo}
                        onChange={setReassignTo}
                        required
                      />
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded">
                      <p className="text-sm text-error">
                        No available staff members for reassignment. Please ensure other staff are available before deleting.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">This will permanently:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <Icon name="X" size={14} className="text-error" />
                Remove staff member from all systems
              </li>
              <li className="flex items-center gap-2">
                <Icon name="X" size={14} className="text-error" />
                Revoke all access permissions
              </li>
              <li className="flex items-center gap-2">
                <Icon name="X" size={14} className="text-error" />
                Archive performance history
              </li>
              {hasActiveAssignments && (
                <li className="flex items-center gap-2">
                  <Icon name="ArrowRight" size={14} className="text-warning" />
                  Transfer active assignments to selected staff
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            loading={loading}
            disabled={hasActiveAssignments && (!reassignTo || reassignmentOptions?.length === 0)}
            iconName="Trash2"
            iconPosition="left"
          >
            Delete Staff Member
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;