import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import LocationSelector from './LocationSelector';
import WasteTypeSelector from './WasteTypeSelector';
import PhotoUpload from './PhotoUpload';

const ReportForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    location: null,
    wasteType: '',
    description: '',
    photos: [],
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    },
    urgency: 'medium'
  });

  const [errors, setErrors] = useState({});

  const urgencyOptions = [
    { value: 'Prioritas Rendah', label: 'Prioritas Rendah', description: 'Tidak mendesak, bisa menunggu beberapa hari.' },
    { value: 'Prioritas Sedang', label: 'Prioritas Sedang', description: 'Perlu ditangani dalam 2–3 hari.' },
    { value: 'Prioritas Tinggi', label: 'Prioritas Tinggi', description: 'Butuh perhatian segera dalam 24 jam.' },
    { value: 'Darurat', label: 'Darurat', description: 'Bahaya langsung terhadap kesehatan atau keselamatan.' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.location) {
      newErrors.location = 'Please select a location for the waste issue';
    }

    if (!formData?.wasteType) {
      newErrors.wasteType = 'Please select the type of waste issue';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Please provide a description of the issue';
    } else if (formData?.description?.trim()?.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    if (!formData?.contactInfo?.name?.trim()) {
      newErrors.name = 'Please provide your name';
    }

    if (!formData?.contactInfo?.email?.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.contactInfo?.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const now = new Date();
  
      const reportData = {
        ...formData,
        id: `GRSK-${Date.now()}`, // ID unik
        submittedAt: now.toISOString(), // tanggal valid
        status: 'pending'
      };
  
      onSubmit(reportData);
    }
  };

  const handleLocationChange = (location) => {
    setFormData(prev => ({ ...prev, location }));
    if (errors?.location) {
      setErrors(prev => ({ ...prev, location: null }));
    }
  };

  const handleWasteTypeChange = (wasteType) => {
    setFormData(prev => ({ ...prev, wasteType }));
    if (errors?.wasteType) {
      setErrors(prev => ({ ...prev, wasteType: null }));
    }
  };

  const handlePhotosChange = (photos) => {
    setFormData(prev => ({ ...prev, photos }));
  };

  const handleInputChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    // Clear error when user starts typing
    if (errors?.[field] || errors?.[field?.split('.')?.[1]]) {
      const errorKey = field?.includes('.') ? field?.split('.')?.[1] : field;
      setErrors(prev => ({ ...prev, [errorKey]: null }));
    }
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      low: 'text-success',
      medium: 'text-warning',
      high: 'text-error',
      emergency: 'text-error font-bold'
    };
    return colors?.[urgency] || 'text-muted-foreground';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Location Selection */}
      <LocationSelector
        selectedLocation={formData?.location}
        onLocationChange={handleLocationChange}
        error={errors?.location}
      />
      {/* Waste Type Selection */}
      <WasteTypeSelector
        selectedType={formData?.wasteType}
        onTypeChange={handleWasteTypeChange}
        error={errors?.wasteType}
      />
      {/* Description */}
      <div className="space-y-2">
        <Input
          label="Deskripsi"
          type="textarea"
          placeholder="Jelaskan masalah sampah secara detail. Sertakan info tentang ukuran, kondisi, dan potensi bahaya."
          value={formData?.description}
          onChange={(e) => handleInputChange('description', e?.target?.value)}
          error={errors?.description}
          required
          rows={4}
          maxLength={500}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Minimal 10 characters</span>
          <span>{formData?.description?.length}/500</span>
        </div>
      </div>
      {/* Urgency Level */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Tingkat Prioritas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {urgencyOptions?.map((option) => (
            <label
              key={option?.value}
              className={`relative flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-smooth hover:border-primary/50 ${
                formData?.urgency === option?.value
                  ? 'border-primary bg-primary/5' :'border-border'
              }`}
            >
              <input
                type="radio"
                name="urgency"
                value={option?.value}
                checked={formData?.urgency === option?.value}
                onChange={(e) => handleInputChange('urgency', e?.target?.value)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                formData?.urgency === option?.value
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {formData?.urgency === option?.value && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${getUrgencyColor(option?.value)}`}>
                  {option?.label}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {option?.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* Photo Upload */}
      <PhotoUpload
        photos={formData?.photos}
        onPhotosChange={handlePhotosChange}
        error={errors?.photos}
      />
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Informasi Kontak</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nama Lengkap"
            type="text"
            placeholder="Tulis nama lengkap Anda"
            value={formData?.contactInfo?.name}
            onChange={(e) => handleInputChange('contactInfo.name', e?.target?.value)}
            error={errors?.name}
            required
          />
          <Input
            label="No. Telepon"
            type="tel"
            placeholder="contoh: +62234"
            value={formData?.contactInfo?.phone}
            onChange={(e) => handleInputChange('contactInfo.phone', e?.target?.value)}
          />
        </div>
        <Input
          label="Email"
          type="email"
          placeholder="your.email@example.com"
          value={formData?.contactInfo?.email}
          onChange={(e) => handleInputChange('contactInfo.email', e?.target?.value)}
          error={errors?.email}
          required
        />
      </div>
      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isSubmitting}
          iconName="Send"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size="lg"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => {
            setFormData({
              location: null,
              wasteType: '',
              description: '',
              photos: [],
              contactInfo: { name: '', email: '', phone: '' },
              urgency: 'medium'
            });
            setErrors({});
          }}
        >
          Reset Form
        </Button>
      </div>
    </form>
  );
};

export default ReportForm;