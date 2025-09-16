import React, { useState, useEffect } from 'react';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';
import { Checkbox } from '../../../../components/ui/Checkbox';
import Icon from '../../../../components/AppIcon';

const RequestModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  request = null, 
  mode = 'create' // 'create', 'edit', 'view'
}) => {
  const [formData, setFormData] = useState({
    citizenName: '',
    citizenPhone: '',
    citizenEmail: '',
    address: '',
    district: '',
    wasteType: '',
    priority: 'medium',
    scheduledDate: '',
    scheduledTime: '',
    notes: '',
    specialInstructions: '',
    estimatedWeight: '',
    accessInstructions: '',
    contactPreference: 'phone',
    requiresSpecialEquipment: false,
    isRecurring: false,
    recurringFrequency: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (request && (mode === 'edit' || mode === 'view')) {
      setFormData({
        citizenName: request?.citizenName || '',
        citizenPhone: request?.citizenPhone || '',
        citizenEmail: request?.citizenEmail || '',
        address: request?.address || '',
        district: request?.district || '',
        wasteType: request?.wasteType || '',
        priority: request?.priority || 'medium',
        scheduledDate: request?.scheduledDate || '',
        scheduledTime: request?.scheduledTime || '',
        notes: request?.notes || '',
        specialInstructions: request?.specialInstructions || '',
        estimatedWeight: request?.estimatedWeight || '',
        accessInstructions: request?.accessInstructions || '',
        contactPreference: request?.contactPreference || 'phone',
        requiresSpecialEquipment: request?.requiresSpecialEquipment || false,
        isRecurring: request?.isRecurring || false,
        recurringFrequency: request?.recurringFrequency || ''
      });
    } else if (mode === 'create') {
      setFormData({
        citizenName: '',
        citizenPhone: '',
        citizenEmail: '',
        address: '',
        district: '',
        wasteType: '',
        priority: 'medium',
        scheduledDate: '',
        scheduledTime: '',
        notes: '',
        specialInstructions: '',
        estimatedWeight: '',
        accessInstructions: '',
        contactPreference: 'phone',
        requiresSpecialEquipment: false,
        isRecurring: false,
        recurringFrequency: ''
      });
    }
    setErrors({});
  }, [request, mode, isOpen]);

  const wasteTypeOptions = [
    { value: 'household', label: 'Household Waste' },
    { value: 'recyclable', label: 'Recyclable Materials' },
    { value: 'organic', label: 'Organic Waste' },
    { value: 'electronic', label: 'Electronic Waste' },
    { value: 'hazardous', label: 'Hazardous Materials' },
    { value: 'bulk', label: 'Bulk Items' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const districtOptions = [
    { value: 'downtown', label: 'Downtown District' },
    { value: 'northside', label: 'Northside District' },
    { value: 'southside', label: 'Southside District' },
    { value: 'eastside', label: 'Eastside District' },
    { value: 'westside', label: 'Westside District' },
    { value: 'suburbs', label: 'Suburban District' }
  ];

  const contactPreferenceOptions = [
    { value: 'phone', label: 'Phone Call' },
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS Text' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  const recurringFrequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.citizenName?.trim()) {
      newErrors.citizenName = 'Citizen name is required';
    }

    if (!formData?.citizenPhone?.trim()) {
      newErrors.citizenPhone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/?.test(formData?.citizenPhone)) {
      newErrors.citizenPhone = 'Please enter a valid phone number';
    }

    if (formData?.citizenEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.citizenEmail)) {
      newErrors.citizenEmail = 'Please enter a valid email address';
    }

    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData?.district) {
      newErrors.district = 'District selection is required';
    }

    if (!formData?.wasteType) {
      newErrors.wasteType = 'Waste type selection is required';
    }

    if (!formData?.scheduledDate) {
      newErrors.scheduledDate = 'Scheduled date is required';
    }

    if (!formData?.scheduledTime) {
      newErrors.scheduledTime = 'Scheduled time is required';
    }

    if (formData?.isRecurring && !formData?.recurringFrequency) {
      newErrors.recurringFrequency = 'Recurring frequency is required for recurring requests';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave?.(formData, mode);
      onClose();
    } catch (error) {
      console.error('Error saving request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'create': return 'Create New Pickup Request';
      case 'edit': return 'Edit Pickup Request';
      case 'view': return 'View Pickup Request';
      default: return 'Pickup Request';
    }
  };

  const isReadOnly = mode === 'view';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Truck" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{getModalTitle()}</h2>
              {request && (
                <p className="text-sm text-muted-foreground">Request #{request?.requestId}</p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          >
            <span className="sr-only">Close modal</span>
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Citizen Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Icon name="User" size={20} />
                Citizen Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  value={formData?.citizenName}
                  onChange={(e) => handleInputChange('citizenName', e?.target?.value)}
                  error={errors?.citizenName}
                  required
                  disabled={isReadOnly}
                  placeholder="Enter citizen's full name"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData?.citizenPhone}
                  onChange={(e) => handleInputChange('citizenPhone', e?.target?.value)}
                  error={errors?.citizenPhone}
                  required
                  disabled={isReadOnly}
                  placeholder="+1 (555) 123-4567"
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData?.citizenEmail}
                  onChange={(e) => handleInputChange('citizenEmail', e?.target?.value)}
                  error={errors?.citizenEmail}
                  disabled={isReadOnly}
                  placeholder="citizen@email.com"
                  description="Optional - for email notifications"
                />
                <Select
                  label="Contact Preference"
                  options={contactPreferenceOptions}
                  value={formData?.contactPreference}
                  onChange={(value) => handleInputChange('contactPreference', value)}
                  disabled={isReadOnly}
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Icon name="MapPin" size={20} />
                Location Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Street Address"
                    type="text"
                    value={formData?.address}
                    onChange={(e) => handleInputChange('address', e?.target?.value)}
                    error={errors?.address}
                    required
                    disabled={isReadOnly}
                    placeholder="123 Main Street, Apt 4B"
                  />
                </div>
                <Select
                  label="District"
                  options={districtOptions}
                  value={formData?.district}
                  onChange={(value) => handleInputChange('district', value)}
                  error={errors?.district}
                  required
                  disabled={isReadOnly}
                />
                <Input
                  label="Access Instructions"
                  type="text"
                  value={formData?.accessInstructions}
                  onChange={(e) => handleInputChange('accessInstructions', e?.target?.value)}
                  disabled={isReadOnly}
                  placeholder="Gate code, parking instructions, etc."
                  description="Optional - special access requirements"
                />
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Icon name="Package" size={20} />
                Service Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Waste Type"
                  options={wasteTypeOptions}
                  value={formData?.wasteType}
                  onChange={(value) => handleInputChange('wasteType', value)}
                  error={errors?.wasteType}
                  required
                  disabled={isReadOnly}
                />
                <Select
                  label="Priority Level"
                  options={priorityOptions}
                  value={formData?.priority}
                  onChange={(value) => handleInputChange('priority', value)}
                  disabled={isReadOnly}
                />
                <Input
                  label="Estimated Weight (kg)"
                  type="number"
                  value={formData?.estimatedWeight}
                  onChange={(e) => handleInputChange('estimatedWeight', e?.target?.value)}
                  disabled={isReadOnly}
                  placeholder="50"
                  description="Optional - helps with resource planning"
                />
                <div className="space-y-3">
                  <Checkbox
                    label="Requires Special Equipment"
                    checked={formData?.requiresSpecialEquipment}
                    onChange={(e) => handleInputChange('requiresSpecialEquipment', e?.target?.checked)}
                    disabled={isReadOnly}
                    description="Heavy lifting, hazmat gear, etc."
                  />
                </div>
              </div>
            </div>

            {/* Scheduling */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Icon name="Calendar" size={20} />
                Scheduling
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Scheduled Date"
                  type="date"
                  value={formData?.scheduledDate}
                  onChange={(e) => handleInputChange('scheduledDate', e?.target?.value)}
                  error={errors?.scheduledDate}
                  required
                  disabled={isReadOnly}
                  min={new Date()?.toISOString()?.split('T')?.[0]}
                />
                <Input
                  label="Preferred Time"
                  type="time"
                  value={formData?.scheduledTime}
                  onChange={(e) => handleInputChange('scheduledTime', e?.target?.value)}
                  error={errors?.scheduledTime}
                  required
                  disabled={isReadOnly}
                />
                <div className="md:col-span-2 space-y-3">
                  <Checkbox
                    label="Recurring Request"
                    checked={formData?.isRecurring}
                    onChange={(e) => handleInputChange('isRecurring', e?.target?.checked)}
                    disabled={isReadOnly}
                    description="Set up regular pickup schedule"
                  />
                  {formData?.isRecurring && (
                    <Select
                      label="Recurring Frequency"
                      options={recurringFrequencyOptions}
                      value={formData?.recurringFrequency}
                      onChange={(value) => handleInputChange('recurringFrequency', value)}
                      error={errors?.recurringFrequency}
                      required={formData?.isRecurring}
                      disabled={isReadOnly}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Icon name="FileText" size={20} />
                Additional Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="Special Instructions"
                  type="text"
                  value={formData?.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e?.target?.value)}
                  disabled={isReadOnly}
                  placeholder="Fragile items, hazardous materials, etc."
                  description="Optional - special handling requirements"
                />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData?.notes}
                    onChange={(e) => handleInputChange('notes', e?.target?.value)}
                    disabled={isReadOnly}
                    placeholder="Any additional information or requests..."
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        {!isReadOnly && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/30">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              loading={isSubmitting}
              iconName={mode === 'create' ? 'Plus' : 'Save'}
              iconPosition="left"
            >
              {mode === 'create' ? 'Create Request' : 'Save Changes'}
            </Button>
          </div>
        )}

        {isReadOnly && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/30">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="default"
              onClick={() => {/* Switch to edit mode */}}
              iconName="Edit"
              iconPosition="left"
            >
              Edit Request
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestModal;