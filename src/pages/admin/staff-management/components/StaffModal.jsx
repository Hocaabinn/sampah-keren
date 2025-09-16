import React, { useState, useEffect } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';
import { Checkbox } from '../../../../components/ui/Checkbox';

const StaffModal = ({ 
  isOpen, 
  onClose, 
  staff, 
  onSave, 
  mode = 'add' // 'add', 'edit', 'view'
}) => {
  const [formData, setFormData] = useState({
    staffId: '',
    name: '',
    email: '',
    phone: '',
    emergencyContact: '',
    role: '',
    department: '',
    status: 'active',
    assignmentStatus: 'available',
    hireDate: '',
    address: '',
    licenseNumber: '',
    certifications: [],
    systemAccess: {
      dashboard: false,
      requests: false,
      schedule: false,
      reports: false
    }
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (staff && (mode === 'edit' || mode === 'view')) {
      setFormData({
        staffId: staff?.staffId || '',
        name: staff?.name || '',
        email: staff?.email || '',
        phone: staff?.phone || '',
        emergencyContact: staff?.emergencyContact || '',
        role: staff?.role || '',
        department: staff?.department || '',
        status: staff?.status || 'active',
        assignmentStatus: staff?.assignmentStatus || 'available',
        hireDate: staff?.hireDate || '',
        address: staff?.address || '',
        licenseNumber: staff?.licenseNumber || '',
        certifications: staff?.certifications || [],
        systemAccess: staff?.systemAccess || {
          dashboard: false,
          requests: false,
          schedule: false,
          reports: false
        }
      });
    } else if (mode === 'add') {
      setFormData({
        staffId: `ST${Date.now()?.toString()?.slice(-6)}`,
        name: '',
        email: '',
        phone: '',
        emergencyContact: '',
        role: '',
        department: '',
        status: 'active',
        assignmentStatus: 'available',
        hireDate: new Date()?.toISOString()?.split('T')?.[0],
        address: '',
        licenseNumber: '',
        certifications: [],
        systemAccess: {
          dashboard: false,
          requests: false,
          schedule: false,
          reports: false
        }
      });
    }
    setErrors({});
  }, [staff, mode, isOpen]);

  const departmentOptions = [
    { value: 'collection', label: 'Collection Services' },
    { value: 'recycling', label: 'Recycling Operations' },
    { value: 'maintenance', label: 'Vehicle Maintenance' },
    { value: 'administration', label: 'Administration' },
    { value: 'customer_service', label: 'Customer Service' }
  ];

  const roleOptions = [
    { value: 'driver', label: 'Driver' },
    { value: 'collector', label: 'Waste Collector' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'coordinator', label: 'Route Coordinator' },
    { value: 'mechanic', label: 'Mechanic' },
    { value: 'admin', label: 'Administrator' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on_leave', label: 'On Leave' }
  ];

  const assignmentOptions = [
    { value: 'available', label: 'Available' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'busy', label: 'Busy' }
  ];

  const certificationOptions = [
    { value: 'cdl_a', label: 'CDL Class A' },
    { value: 'cdl_b', label: 'CDL Class B' },
    { value: 'hazmat', label: 'Hazmat Certification' },
    { value: 'safety', label: 'Safety Training' },
    { value: 'first_aid', label: 'First Aid/CPR' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSystemAccessChange = (permission, checked) => {
    setFormData(prev => ({
      ...prev,
      systemAccess: {
        ...prev?.systemAccess,
        [permission]: checked
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = 'Name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.role) newErrors.role = 'Role is required';
    if (!formData?.department) newErrors.department = 'Department is required';
    if (!formData?.hireDate) newErrors.hireDate = 'Hire date is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving staff:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isReadOnly = mode === 'view';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="User" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {mode === 'add' ? 'Add New Staff Member' : 
                 mode === 'edit' ? 'Edit Staff Member' : 'Staff Member Details'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {mode === 'add' ? 'Create a new staff member profile' :
                 mode === 'edit' ? 'Update staff member information' : 'View staff member information'}
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

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-md font-medium text-foreground mb-4 flex items-center gap-2">
                <Icon name="User" size={18} />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Staff ID"
                  value={formData?.staffId}
                  onChange={(e) => handleInputChange('staffId', e?.target?.value)}
                  error={errors?.staffId}
                  disabled={mode === 'edit' || isReadOnly}
                  required
                />
                <Input
                  label="Full Name"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  disabled={isReadOnly}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  disabled={isReadOnly}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  error={errors?.phone}
                  disabled={isReadOnly}
                  required
                />
                <Input
                  label="Emergency Contact"
                  value={formData?.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
                  error={errors?.emergencyContact}
                  disabled={isReadOnly}
                />
                <Input
                  label="Hire Date"
                  type="date"
                  value={formData?.hireDate}
                  onChange={(e) => handleInputChange('hireDate', e?.target?.value)}
                  error={errors?.hireDate}
                  disabled={isReadOnly}
                  required
                />
              </div>
              <div className="mt-4">
                <Input
                  label="Address"
                  value={formData?.address}
                  onChange={(e) => handleInputChange('address', e?.target?.value)}
                  error={errors?.address}
                  disabled={isReadOnly}
                />
              </div>
            </div>

            {/* Role & Department */}
            <div>
              <h3 className="text-md font-medium text-foreground mb-4 flex items-center gap-2">
                <Icon name="Briefcase" size={18} />
                Role & Department
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Department"
                  options={departmentOptions}
                  value={formData?.department}
                  onChange={(value) => handleInputChange('department', value)}
                  error={errors?.department}
                  disabled={isReadOnly}
                  required
                />
                <Select
                  label="Role"
                  options={roleOptions}
                  value={formData?.role}
                  onChange={(value) => handleInputChange('role', value)}
                  error={errors?.role}
                  disabled={isReadOnly}
                  required
                />
                <Select
                  label="Employment Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                  disabled={isReadOnly}
                />
                <Select
                  label="Assignment Status"
                  options={assignmentOptions}
                  value={formData?.assignmentStatus}
                  onChange={(value) => handleInputChange('assignmentStatus', value)}
                  disabled={isReadOnly}
                />
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-md font-medium text-foreground mb-4 flex items-center gap-2">
                <Icon name="Award" size={18} />
                Certifications & Licenses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="License Number"
                  value={formData?.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e?.target?.value)}
                  disabled={isReadOnly}
                />
                <Select
                  label="Certifications"
                  options={certificationOptions}
                  value={formData?.certifications}
                  onChange={(value) => handleInputChange('certifications', value)}
                  multiple
                  disabled={isReadOnly}
                />
              </div>
            </div>

            {/* System Access */}
            <div>
              <h3 className="text-md font-medium text-foreground mb-4 flex items-center gap-2">
                <Icon name="Shield" size={18} />
                System Access Permissions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Checkbox
                  label="Dashboard Access"
                  description="View dashboard and analytics"
                  checked={formData?.systemAccess?.dashboard}
                  onChange={(e) => handleSystemAccessChange('dashboard', e?.target?.checked)}
                  disabled={isReadOnly}
                />
                <Checkbox
                  label="Pickup Requests"
                  description="Manage waste pickup requests"
                  checked={formData?.systemAccess?.requests}
                  onChange={(e) => handleSystemAccessChange('requests', e?.target?.checked)}
                  disabled={isReadOnly}
                />
                <Checkbox
                  label="Service Schedule"
                  description="View and manage schedules"
                  checked={formData?.systemAccess?.schedule}
                  onChange={(e) => handleSystemAccessChange('schedule', e?.target?.checked)}
                  disabled={isReadOnly}
                />
                <Checkbox
                  label="Reports Access"
                  description="Generate and view reports"
                  checked={formData?.systemAccess?.reports}
                  onChange={(e) => handleSystemAccessChange('reports', e?.target?.checked)}
                  disabled={isReadOnly}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            {isReadOnly ? 'Close' : 'Cancel'}
          </Button>
          {!isReadOnly && (
            <Button
              type="submit"
              loading={loading}
              onClick={handleSubmit}
              iconName={mode === 'add' ? 'Plus' : 'Save'}
              iconPosition="left"
            >
              {mode === 'add' ? 'Add Staff Member' : 'Save Changes'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffModal;