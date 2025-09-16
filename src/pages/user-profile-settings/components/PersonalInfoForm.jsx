import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const PersonalInfoForm = ({ userProfile, onSave }) => {
  const [formData, setFormData] = useState({
    name: userProfile?.name,
    email: userProfile?.email,
    phone: userProfile?.phone,
    address: userProfile?.address,
    city: userProfile?.city,
    zipCode: userProfile?.zipCode,
    preferredLanguage: userProfile?.preferredLanguage
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'idn', label: 'Indonesian' },
  
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name,
      email: userProfile?.email,
      phone: userProfile?.phone,
      address: userProfile?.address,
      city: userProfile?.city,
      zipCode: userProfile?.zipCode,
      preferredLanguage: userProfile?.preferredLanguage
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Email Address"
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          disabled={!isEditing}
          placeholder="(555) 123-4567"
        />

        <Select
          label="Preferred Language"
          options={languageOptions}
          value={formData?.preferredLanguage}
          onChange={(value) => handleInputChange('preferredLanguage', value)}
          disabled={!isEditing}
        />

        <div className="md:col-span-2">
          <Input
            label="Street Address"
            type="text"
            value={formData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            disabled={!isEditing}
            placeholder="123 Main Street"
          />
        </div>

        <Input
          label="City"
          type="text"
          value={formData?.city}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
          disabled={!isEditing}
          placeholder="San Francisco"
        />

        <Input
          label="ZIP Code"
          type="text"
          value={formData?.zipCode}
          onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
          disabled={!isEditing}
          placeholder="94102"
        />
      </div>
      {isEditing && (
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
          <Button
            variant="default"
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoForm;