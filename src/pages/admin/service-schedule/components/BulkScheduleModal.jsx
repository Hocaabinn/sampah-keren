import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';
import { Checkbox } from '../../../../components/ui/Checkbox';

const BulkScheduleModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  staffMembers, 
  vehicles 
}) => {
  const [formData, setFormData] = useState({
    routePrefix: '',
    startDate: '',
    endDate: '',
    frequency: 'weekly',
    daysOfWeek: [],
    startTime: '',
    duration: '',
    wasteType: '',
    priority: 'medium',
    staffAssignment: 'auto',
    vehicleAssignment: 'auto',
    specificStaff: '',
    specificVehicle: '',
    locations: '',
    estimatedDistance: '',
    notes: ''
  });

  const [preview, setPreview] = useState([]);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

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

  const assignmentOptions = [
    { value: 'auto', label: 'Auto-assign (Balanced)' },
    { value: 'specific', label: 'Assign Specific Resource' },
    { value: 'rotate', label: 'Rotate Resources' }
  ];

  const daysOfWeekOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const staffOptions = staffMembers?.map(staff => ({
    value: staff?.id,
    label: `${staff?.name} - ${staff?.role}`
  }));

  const vehicleOptions = vehicles?.map(vehicle => ({
    value: vehicle?.id,
    label: `${vehicle?.type} - ${vehicle?.plateNumber}`
  }));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      daysOfWeek: prev?.daysOfWeek?.includes(day)
        ? prev?.daysOfWeek?.filter(d => d !== day)
        : [...prev?.daysOfWeek, day]
    }));
  };

  const generatePreview = async () => {
    if (!formData?.startDate || !formData?.endDate || !formData?.startTime) {
      return;
    }

    setIsGeneratingPreview(true);
    
    try {
      // Simulate preview generation
      const schedules = [];
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      let currentDate = new Date(startDate);
      let scheduleCounter = 1;

      while (currentDate <= endDate) {
        let shouldInclude = false;

        if (formData?.frequency === 'daily') {
          shouldInclude = true;
        } else if (formData?.frequency === 'weekly') {
          const dayName = currentDate?.toLocaleDateString('en-US', { weekday: 'long' })?.toLowerCase();
          shouldInclude = formData?.daysOfWeek?.includes(dayName);
        } else if (formData?.frequency === 'biweekly') {
          const weeksDiff = Math.floor((currentDate - startDate) / (7 * 24 * 60 * 60 * 1000));
          const dayName = currentDate?.toLocaleDateString('en-US', { weekday: 'long' })?.toLowerCase();
          shouldInclude = weeksDiff % 2 === 0 && formData?.daysOfWeek?.includes(dayName);
        } else if (formData?.frequency === 'monthly') {
          shouldInclude = currentDate?.getDate() === startDate?.getDate();
        }

        if (shouldInclude) {
          // Auto-assign resources
          let assignedStaff = formData?.specificStaff;
          let assignedVehicle = formData?.specificVehicle;

          if (formData?.staffAssignment === 'auto') {
            assignedStaff = staffMembers?.[scheduleCounter % staffMembers?.length]?.id;
          } else if (formData?.staffAssignment === 'rotate') {
            assignedStaff = staffMembers?.[Math.floor(scheduleCounter / 2) % staffMembers?.length]?.id;
          }

          if (formData?.vehicleAssignment === 'auto') {
            assignedVehicle = vehicles?.[scheduleCounter % vehicles?.length]?.id;
          } else if (formData?.vehicleAssignment === 'rotate') {
            assignedVehicle = vehicles?.[Math.floor(scheduleCounter / 2) % vehicles?.length]?.id;
          }

          schedules?.push({
            id: `bulk-${scheduleCounter}`,
            route: `${formData?.routePrefix} ${scheduleCounter}`,
            date: new Date(currentDate),
            time: formData?.startTime,
            duration: formData?.duration,
            staff: assignedStaff,
            vehicle: assignedVehicle,
            wasteType: formData?.wasteType,
            priority: formData?.priority,
            locations: formData?.locations,
            estimatedDistance: formData?.estimatedDistance,
            notes: formData?.notes,
            status: 'pending'
          });
          scheduleCounter++;
        }

        currentDate?.setDate(currentDate?.getDate() + 1);
      }

      setPreview(schedules);
    } catch (error) {
      console.error('Error generating preview:', error);
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (preview?.length === 0) {
      await generatePreview();
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(preview);
      onClose();
    } catch (error) {
      console.error('Error creating bulk schedules:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="CalendarDays" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Bulk Schedule Creation
                </h2>
                <p className="text-sm text-muted-foreground">
                  Create multiple schedules with recurring patterns
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

        <div className="flex">
          {/* Form Section */}
          <div className="flex-1 p-6 border-r border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Schedule Pattern</h3>
                
                <Input
                  label="Route Name Prefix"
                  type="text"
                  placeholder="e.g., District A Route"
                  value={formData?.routePrefix}
                  onChange={(e) => handleInputChange('routePrefix', e?.target?.value)}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={formData?.startDate}
                    onChange={(e) => handleInputChange('startDate', e?.target?.value)}
                    required
                  />
                  
                  <Input
                    label="End Date"
                    type="date"
                    value={formData?.endDate}
                    onChange={(e) => handleInputChange('endDate', e?.target?.value)}
                    required
                  />
                </div>

                <Select
                  label="Frequency"
                  options={frequencyOptions}
                  value={formData?.frequency}
                  onChange={(value) => handleInputChange('frequency', value)}
                  required
                />

                {(formData?.frequency === 'weekly' || formData?.frequency === 'biweekly') && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Days of Week
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {daysOfWeekOptions?.map(day => (
                        <div key={day?.value} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData?.daysOfWeek?.includes(day?.value)}
                            onChange={() => handleDayToggle(day?.value)}
                          />
                          <label className="text-sm text-foreground">
                            {day?.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Schedule Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Schedule Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Time"
                    type="time"
                    value={formData?.startTime}
                    onChange={(e) => handleInputChange('startTime', e?.target?.value)}
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

                <div className="grid grid-cols-2 gap-4">
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Select
                      label="Staff Assignment"
                      options={assignmentOptions}
                      value={formData?.staffAssignment}
                      onChange={(value) => handleInputChange('staffAssignment', value)}
                    />
                    {formData?.staffAssignment === 'specific' && (
                      <div className="mt-2">
                        <Select
                          options={staffOptions}
                          value={formData?.specificStaff}
                          onChange={(value) => handleInputChange('specificStaff', value)}
                          searchable
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Select
                      label="Vehicle Assignment"
                      options={assignmentOptions}
                      value={formData?.vehicleAssignment}
                      onChange={(value) => handleInputChange('vehicleAssignment', value)}
                    />
                    {formData?.vehicleAssignment === 'specific' && (
                      <div className="mt-2">
                        <Select
                          options={vehicleOptions}
                          value={formData?.specificVehicle}
                          onChange={(value) => handleInputChange('specificVehicle', value)}
                          searchable
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Locations per Route"
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
                  placeholder="Additional instructions..."
                  value={formData?.notes}
                  onChange={(e) => handleInputChange('notes', e?.target?.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={generatePreview}
                  loading={isGeneratingPreview}
                  iconName="Eye"
                  iconPosition="left"
                  iconSize={16}
                >
                  Generate Preview
                </Button>
                {preview?.length > 0 && (
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Create {preview?.length} Schedules
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="w-96 p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Preview</h3>
            
            {preview?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Click "Generate Preview" to see the schedules that will be created
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                <div className="text-sm text-muted-foreground mb-2">
                  {preview?.length} schedules will be created
                </div>
                {preview?.slice(0, 10)?.map((schedule, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg text-sm">
                    <div className="font-medium text-foreground">{schedule?.route}</div>
                    <div className="text-muted-foreground">
                      {schedule?.date?.toLocaleDateString()} at {schedule?.time}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {staffMembers?.find(s => s?.id === schedule?.staff)?.name} • 
                      {vehicles?.find(v => v?.id === schedule?.vehicle)?.plateNumber}
                    </div>
                  </div>
                ))}
                {preview?.length > 10 && (
                  <div className="text-xs text-muted-foreground text-center py-2">
                    ... and {preview?.length - 10} more schedules
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkScheduleModal;