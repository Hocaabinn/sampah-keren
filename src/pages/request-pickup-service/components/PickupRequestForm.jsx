import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PickupRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: '',
    address: '',
    date: '',
    timeSlot: '',
    wasteType: '',
    quantity: '',
    specialInstructions: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wasteTypeOptions = [
    { value: 'household', label: 'Household Waste' },
    { value: 'recyclable', label: 'Recyclable Materials' },
    { value: 'organic', label: 'Organic/Compost' },
    { value: 'electronic', label: 'Electronic Waste' },
    { value: 'hazardous', label: 'Hazardous Materials' },
    { value: 'bulk', label: 'Bulk Items' }
  ];

  const timeSlotOptions = [
    { value: 'morning', label: '8:00 AM - 12:00 PM' },
    { value: 'afternoon', label: '12:00 PM - 4:00 PM' },
    { value: 'evening', label: '4:00 PM - 8:00 PM' }
  ];

  const quantityOptions = [
    { value: 'small', label: 'Small (1-2 bags)' },
    { value: 'medium', label: 'Medium (3-5 bags)' },
    { value: 'large', label: 'Large (6+ bags)' },
    { value: 'bulk', label: 'Bulk Items' }
  ];

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData?.date) {
      newErrors.date = 'Pickup date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today?.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Pickup date cannot be in the past';
      }
    }

    if (!formData?.timeSlot) {
      newErrors.timeSlot = 'Time slot is required';
    }

    if (!formData?.wasteType) {
      newErrors.wasteType = 'Waste type is required';
    }

    if (!formData?.quantity) {
      newErrors.quantity = 'Quantity estimate is required';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newRequest = {
        id: Date.now(),
        ...formData,
        status: 'scheduled',
        requestDate: new Date()?.toISOString(),
        estimatedPickup: new Date(formData.date)?.toISOString()
      };

      onSubmit(newRequest);
      
      // Reset form
      setFormData({
        location: '',
        address: '',
        date: '',
        timeSlot: '',
        wasteType: '',
        quantity: '',
        specialInstructions: ''
      });
      
    } catch (error) {
      console.error('Error submitting pickup request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    return tomorrow?.toISOString()?.split('T')?.[0];
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Truck" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Buat Jadwal Pengangkutan</h2>
          <p className="text-sm text-muted-foreground">Ajukan Layanan Pengangkutan Sampah</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
            <Icon name="MapPin" size={18} color="var(--color-primary)" />
            <span>Lokasi Pengambilan</span>
          </h3>
          
          <Input
            label="Alamat Lengkap Anda"
            type="text"
            placeholder="Enter your complete address"
            value={formData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            error={errors?.address}
            required
            className="w-full"
          />
        </div>

        {/* Date & Time Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Tanggal Pengangkutan "
            type="date"
            value={formData?.date}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
            error={errors?.date}
            min={getMinDate()}
            required
          />

          <Select
            label="Atur Waktu yang Anda inginkan"
            placeholder="Select time slot"
            options={timeSlotOptions}
            value={formData?.timeSlot}
            onChange={(value) => handleInputChange('timeSlot', value)}
            error={errors?.timeSlot}
            required
          />
        </div>

        {/* Waste Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
            <Icon name="Trash2" size={18} color="var(--color-primary)" />
            <span>Detail Sampah</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Jenis Sampah"
              placeholder="Pilih Jenis Sampah"
              options={wasteTypeOptions}
              value={formData?.wasteType}
              onChange={(value) => handleInputChange('wasteType', value)}
              error={errors?.wasteType}
              required
            />

            <Select
              label="Perkiraan Jumlah Sampah"
              placeholder="Pilih Perkiraan Jumlah Sampah"
              options={quantityOptions}
              value={formData?.quantity}
              onChange={(value) => handleInputChange('quantity', value)}
              error={errors?.quantity}
              required
            />
          </div>
        </div>

        {/* Special Instructions */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
          Instruksi Tambahan (Optional)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            rows={3}
            placeholder="Tuliskan instruksi khusus (contoh: akses lokasi, pintu samping, dll.)"
            value={formData?.specialInstructions}
            onChange={(e) => handleInputChange('specialInstructions', e?.target?.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            iconName="Calendar"
            iconPosition="left"
            className="min-w-[160px]"
          >
            {isSubmitting ? 'Scheduling...' : 'Jadwal Pengangkutan'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PickupRequestForm;