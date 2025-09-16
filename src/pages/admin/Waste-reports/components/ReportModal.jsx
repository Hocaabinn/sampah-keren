import React, { useState, useEffect } from 'react';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';



const ReportModal = ({ isOpen, onClose, report = null, onSave }) => {
  const [formData, setFormData] = useState({
    reportId: '',
    collectionDate: '',
    route: '',
    wasteCategories: {
      general: { collected: 0, unit: 'kg' },
      recyclable: { collected: 0, unit: 'kg' },
      organic: { collected: 0, unit: 'kg' },
      hazardous: { collected: 0, unit: 'kg' },
      electronic: { collected: 0, unit: 'kg' },
      construction: { collected: 0, unit: 'kg' }
    },
    staffAssignment: '',
    vehicleInfo: {
      vehicleId: '',
      driverName: '',
      fuelUsed: 0
    },
    completionStatus: 'completed',
    notes: '',
    photos: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const routeOptions = [
    { value: 'route-001', label: 'Route 001 - Downtown' },
    { value: 'route-002', label: 'Route 002 - Residential North' },
    { value: 'route-003', label: 'Route 003 - Industrial Zone' },
    { value: 'route-004', label: 'Route 004 - Commercial District' },
    { value: 'route-005', label: 'Route 005 - Suburban East' }
  ];

  const staffOptions = [
    { value: 'team-alpha', label: 'Team Alpha' },
    { value: 'team-beta', label: 'Team Beta' },
    { value: 'team-gamma', label: 'Team Gamma' },
    { value: 'team-delta', label: 'Team Delta' }
  ];

  const statusOptions = [
    { value: 'Selesai', label: 'Completed' },
    { value: 'Sedang diproses', label: 'In Progress' },
    { value: 'Tertunda', label: 'Pending Review' }
  ];

  useEffect(() => {
    if (report) {
      setFormData(report);
    } else {
      // Generate new report ID for new reports
      const newReportId = `WR-${Date.now()?.toString()?.slice(-6)}`;
      setFormData(prev => ({
        ...prev,
        reportId: newReportId,
        collectionDate: new Date()?.toISOString()?.split('T')?.[0]
      }));
    }
  }, [report]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleWasteCategoryChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      wasteCategories: {
        ...prev?.wasteCategories,
        [category]: {
          ...prev?.wasteCategories?.[category],
          [field]: value
        }
      }
    }));
  };

  const handleVehicleInfoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      vehicleInfo: {
        ...prev?.vehicleInfo,
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.collectionDate) {
      newErrors.collectionDate = 'Collection date is required';
    }
    if (!formData?.route) {
      newErrors.route = 'Route selection is required';
    }
    if (!formData?.staffAssignment) {
      newErrors.staffAssignment = 'Staff assignment is required';
    }
    if (!formData?.vehicleInfo?.vehicleId) {
      newErrors.vehicleId = 'Vehicle ID is required';
    }
    if (!formData?.vehicleInfo?.driverName) {
      newErrors.driverName = 'Driver name is required';
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
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e?.target?.files);
    // Mock photo upload - in real app would upload to server
    const newPhotos = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      url: URL.createObjectURL(file),
      size: file?.size
    }));
    
    setFormData(prev => ({
      ...prev,
      photos: [...prev?.photos, ...newPhotos]
    }));
  };

  const removePhoto = (photoId) => {
    setFormData(prev => ({
      ...prev,
      photos: prev?.photos?.filter(photo => photo?.id !== photoId)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {report ? 'Edit Waste Report' : 'Generate New Report'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          >
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="ID Laporan"
                value={formData?.reportId}
                disabled
                description="Auto-generated unique identifier"
              />
              <Input
                type="date"
                label="Tanggal Pengumpulan"
                value={formData?.collectionDate}
                onChange={(e) => handleInputChange('collectionDate', e?.target?.value)}
                error={errors?.collectionDate}
                required
              />
              <Select
                label="Rute"
                options={routeOptions}
                value={formData?.route}
                onChange={(value) => handleInputChange('route', value)}
                error={errors?.route}
                required
              />
              <Select
                label="Staff Assignment"
                options={staffOptions}
                value={formData?.staffAssignment}
                onChange={(value) => handleInputChange('staffAssignment', value)}
                error={errors?.staffAssignment}
                required
              />
            </div>

            {/* Waste Categories */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Waste Collection Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(formData?.wasteCategories)?.map(([category, data]) => (
                  <div key={category} className="bg-muted rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2 capitalize">
                      {category?.replace(/([A-Z])/g, ' $1')?.trim()} Waste
                    </h4>
                    <Input
                      type="number"
                      label="Amount Collected"
                      value={data?.collected}
                      onChange={(e) => handleWasteCategoryChange(category, 'collected', parseFloat(e?.target?.value) || 0)}
                      placeholder="0"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Unit: kg</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Information */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Vehicle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Vehicle ID"
                  value={formData?.vehicleInfo?.vehicleId}
                  onChange={(e) => handleVehicleInfoChange('vehicleId', e?.target?.value)}
                  error={errors?.vehicleId}
                  placeholder="e.g., WM-001"
                  required
                />
                <Input
                  label="Driver Name"
                  value={formData?.vehicleInfo?.driverName}
                  onChange={(e) => handleVehicleInfoChange('driverName', e?.target?.value)}
                  error={errors?.driverName}
                  placeholder="Enter driver name"
                  required
                />
                <Input
                  type="number"
                  label="Fuel Used (L)"
                  value={formData?.vehicleInfo?.fuelUsed}
                  onChange={(e) => handleVehicleInfoChange('fuelUsed', parseFloat(e?.target?.value) || 0)}
                  placeholder="0"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            {/* Status and Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Completion Status"
                options={statusOptions}
                value={formData?.completionStatus}
                onChange={(value) => handleInputChange('completionStatus', value)}
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={formData?.notes}
                  onChange={(e) => handleInputChange('notes', e?.target?.value)}
                  placeholder="Enter any additional observations or notes..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Photo Documentation */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Photo Documentation</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    id="photo-upload"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('photo-upload')?.click()}
                    iconName="Camera"
                    iconSize={16}
                  >
                    Upload Photos
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Upload photos of collection areas, vehicle, or waste documentation
                  </p>
                </div>

                {formData?.photos?.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData?.photos?.map((photo) => (
                      <div key={photo?.id} className="relative group">
                        <img
                          src={photo?.url}
                          alt={photo?.name}
                          className="w-full h-24 object-cover rounded-lg border border-border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removePhoto(photo?.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          iconName="X"
                          iconSize={12}
                        >
                          <span className="sr-only">Remove photo</span>
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {photo?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/50">
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
              loading={isSubmitting}
              iconName="Save"
              iconSize={16}
            >
              {report ? 'Update Report' : 'Generate Report'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;