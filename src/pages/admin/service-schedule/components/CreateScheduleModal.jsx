import React, { useState, useEffect } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';
import { Checkbox } from '../../../../components/ui/Checkbox';

const CreateScheduleModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  selectedDate, 
  staffMembers, 
  vehicles, 
  existingSchedules = [],
  editingSchedule = null 
}) => {
  const [formData, setFormData] = useState({
    route: '',
    date: '',
    time: '',
    duration: '',
    staff: '',
    vehicle: '',
    wasteType: '',
    priority: 'medium',
    locations: '',
    estimatedDistance: '',
    notes: '',
    recurring: false,
    recurringPattern: 'weekly',
    recurringEnd: ''
  });

  const [conflicts, setConflicts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingSchedule) {
        setFormData({
          ...editingSchedule,
          date: new Date(editingSchedule.date)?.toISOString()?.split('T')?.[0],
          recurring: false,
          recurringPattern: 'weekly',
          recurringEnd: ''
        });
      } else {
        setFormData({
          route: '',
          date: selectedDate ? selectedDate?.toISOString()?.split('T')?.[0] : '',
          time: '',
          duration: '',
          staff: '',
          vehicle: '',
          wasteType: '',
          priority: 'medium',
          locations: '',
          estimatedDistance: '',
          notes: '',
          recurring: false,
          recurringPattern: 'weekly',
          recurringEnd: ''
        });
      }
      setConflicts([]);
    }
  }, [isOpen, selectedDate, editingSchedule]);

  const wasteTypeOptions = [
    { value: 'organic', label: 'Organic Waste' },
    { value: 'recyclable', label: 'Recyclable' },
    { value: 'hazardous', label: 'Hazardous' },
    { value: 'general', label: 'General Waste' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const recurringOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const staffOptions = staffMembers?.map(staff => ({
    value: staff?.id,
    label: `${staff?.name} - ${staff?.role}`
  }));

  const vehicleOptions = vehicles?.map(vehicle => ({
    value: vehicle?.id,
    label: `${vehicle?.type} - ${vehicle?.plateNumber} (${vehicle?.capacity})`
  }));

  const checkConflicts = () => {
    if (!formData?.date || !formData?.time || !formData?.staff || !formData?.vehicle) {
      return;
    }

    const newConflicts = [];
    const scheduleDate = new Date(formData.date)?.toDateString();
    const scheduleTime = formData?.time;

    existingSchedules?.forEach(schedule => {
      if (editingSchedule && schedule?.id === editingSchedule?.id) return;

      const existingDate = new Date(schedule.date)?.toDateString();
      if (existingDate === scheduleDate) {
        // Check staff conflict
        if (schedule?.staff === formData?.staff) {
          const timeDiff = Math.abs(
            new Date(`2000-01-01 ${scheduleTime}`)?.getTime() - 
            new Date(`2000-01-01 ${schedule.time}`)?.getTime()
          );
          if (timeDiff < 2 * 60 * 60 * 1000) { // 2 hours
            newConflicts?.push({
              type: 'staff',
              message: `Staff member ${staffMembers?.find(s => s?.id === formData?.staff)?.name} is already scheduled at ${schedule?.time}`
            });
          }
        }

        // Check vehicle conflict
        if (schedule?.vehicle === formData?.vehicle) {
          const timeDiff = Math.abs(
            new Date(`2000-01-01 ${scheduleTime}`)?.getTime() - 
            new Date(`2000-01-01 ${schedule.time}`)?.getTime()
          );
          if (timeDiff < 1 * 60 * 60 * 1000) { // 1 hour
            newConflicts?.push({
              type: 'vehicle',
              message: `Vehicle is already scheduled at ${schedule?.time}`
            });
          }
        }
      }
    });

    setConflicts(newConflicts);
  };

  useEffect(() => {
    checkConflicts();
  }, [formData?.date, formData?.time, formData?.staff, formData?.vehicle]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (conflicts?.length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const scheduleData = {
        ...formData,
        id: editingSchedule ? editingSchedule?.id : Date.now()?.toString(),
        status: editingSchedule ? editingSchedule?.status : 'pending',
        progress: editingSchedule ? editingSchedule?.progress : 0
      };

      await onSave(scheduleData);
      onClose();
    } catch (error) {
      console.error('Error saving schedule:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {editingSchedule ? 'Edit Schedule' : 'Create New Schedule'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {editingSchedule ? 'Update pickup schedule details' : 'Plan a new waste pickup route'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Route Name"
                type="text"
                placeholder="e.g., Downtown District A"
                value={formData?.route}
                onChange={(e) => handleInputChange('route', e?.target?.value)}
                required
              />
              
              <Input
                label="Date"
                type="date"
                value={formData?.date}
                onChange={(e) => handleInputChange('date', e?.target?.value)}
                required
              />
              
              <Input
                label="Start Time"
                type="time"
                value={formData?.time}
                onChange={(e) => handleInputChange('time', e?.target?.value)}
                required
              />
              
              <Input
                label="Duration"
                type="text"
                placeholder="e.g., 2 hours"
                value={formData?.duration}
                onChange={(e) => handleInputChange('duration', e?.target?.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Waste Type"
                options={wasteTypeOptions}
                value={formData?.wasteType}
                onChange={(value) => handleInputChange('wasteType', value)}
                required
              />
              
              <Select
                label="Priority"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
                required
              />
            </div>
          </div>

          {/* Resource Assignment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Resource Assignment</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Assigned Staff"
                options={staffOptions}
                value={formData?.staff}
                onChange={(value) => handleInputChange('staff', value)}
                searchable
                required
              />
              
              <Select
                label="Vehicle"
                options={vehicleOptions}
                value={formData?.vehicle}
                onChange={(value) => handleInputChange('vehicle', value)}
                searchable
                required
              />
            </div>
          </div>

          {/* Route Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Route Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Number of Locations"
                type="number"
                placeholder="e.g., 25"
                value={formData?.locations}
                onChange={(e) => handleInputChange('locations', e?.target?.value)}
              />
              
              <Input
                label="Estimated Distance"
                type="text"
                placeholder="e.g., 15 km"
                value={formData?.estimatedDistance}
                onChange={(e) => handleInputChange('estimatedDistance', e?.target?.value)}
              />
            </div>

            <Input
              label="Notes"
              type="text"
              placeholder="Additional instructions or special requirements..."
              value={formData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
            />
          </div>

          {/* Recurring Schedule */}
          {!editingSchedule && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={formData?.recurring}
                  onChange={(e) => handleInputChange('recurring', e?.target?.checked)}
                />
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Create Recurring Schedule
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Automatically create multiple schedules based on a pattern
                  </p>
                </div>
              </div>

              {formData?.recurring && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                  <Select
                    label="Recurring Pattern"
                    options={recurringOptions}
                    value={formData?.recurringPattern}
                    onChange={(value) => handleInputChange('recurringPattern', value)}
                  />
                  
                  <Input
                    label="End Date"
                    type="date"
                    value={formData?.recurringEnd}
                    onChange={(e) => handleInputChange('recurringEnd', e?.target?.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Conflicts Warning */}
          {conflicts?.length > 0 && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                <h4 className="font-medium text-error">Schedule Conflicts Detected</h4>
              </div>
              <ul className="space-y-1">
                {conflicts?.map((conflict, index) => (
                  <li key={index} className="text-sm text-error flex items-center gap-2">
                    <Icon name="AlertCircle" size={12} />
                    {conflict?.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || conflicts?.length > 0}
              loading={isSubmitting}
              iconName={editingSchedule ? "Save" : "Plus"}
              iconPosition="left"
              iconSize={16}
            >
              {editingSchedule ? 'Update Schedule' : 'Create Schedule'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateScheduleModal;