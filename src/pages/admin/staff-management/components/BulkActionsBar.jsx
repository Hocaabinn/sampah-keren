import React, { useState } from 'react';

import Button from '../../../../components/ui/Button';
import Select from '../../../../components/ui/Select';

const BulkActionsBar = ({ 
  selectedCount, 
  onClearSelection, 
  onBulkStatusUpdate,
  onBulkAssignment,
  onBulkExport,
  onBulkDelete
}) => {
  const [showActions, setShowActions] = useState(false);
  const [bulkStatus, setBulkStatus] = useState('');
  const [bulkAssignment, setBulkAssignment] = useState('');

  if (selectedCount === 0) return null;

  const statusOptions = [
    { value: '', label: 'Select status...' },
    { value: 'active', label: 'Set as Active' },
    { value: 'inactive', label: 'Set as Inactive' },
    { value: 'on_leave', label: 'Set as On Leave' }
  ];

  const assignmentOptions = [
    { value: '', label: 'Select assignment...' },
    { value: 'available', label: 'Mark as Available' },
    { value: 'assigned', label: 'Assign to Routes' },
    { value: 'busy', label: 'Mark as Busy' }
  ];

  const handleStatusUpdate = () => {
    if (bulkStatus) {
      onBulkStatusUpdate(bulkStatus);
      setBulkStatus('');
      setShowActions(false);
    }
  };

  const handleAssignmentUpdate = () => {
    if (bulkAssignment) {
      onBulkAssignment(bulkAssignment);
      setBulkAssignment('');
      setShowActions(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-card border border-border rounded-lg shadow-modal p-4 min-w-96">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">{selectedCount}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {selectedCount} staff member{selectedCount > 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(!showActions)}
              iconName={showActions ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="right"
            >
              Actions
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearSelection}
              iconName="X"
              iconSize={16}
            >
              <span className="sr-only">Clear selection</span>
            </Button>
          </div>
        </div>

        {showActions && (
          <div className="mt-4 pt-4 border-t border-border space-y-4">
            {/* Status Update */}
            <div className="flex items-center gap-2">
              <Select
                options={statusOptions}
                value={bulkStatus}
                onChange={setBulkStatus}
                placeholder="Update status"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleStatusUpdate}
                disabled={!bulkStatus}
                iconName="RefreshCw"
                iconSize={16}
              >
                Update
              </Button>
            </div>

            {/* Assignment Update */}
            <div className="flex items-center gap-2">
              <Select
                options={assignmentOptions}
                value={bulkAssignment}
                onChange={setBulkAssignment}
                placeholder="Update assignment"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleAssignmentUpdate}
                disabled={!bulkAssignment}
                iconName="Users"
                iconSize={16}
              >
                Assign
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={onBulkExport}
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export Selected
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={onBulkDelete}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
              >
                Delete Selected
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActionsBar;