import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const WasteTypeSelector = ({ selectedType, onTypeChange, error }) => {
  const wasteTypes = [
    { 
      value: 'Pembuangan Ilegal', 
      label: 'Pembuangan Ilegal',
      description: 'Ada yang membuang furnitur bekas dan material konstruksi di lahan kosong.'
    },
    { 
      value: 'Tempat Sampah Penuh', 
      label: 'Tempat Sampah Penuh',
      description: 'Tempat sampah di sudut Jalan Main dan 5th Ave sudah meluap selama beberapa hari.'
    },
    { 
      value: 'hazardous-materials', 
      label: 'Hazardous Materials',
      description: 'Dangerous waste requiring special handling'
    },
    { 
      value: 'broken-glass', 
      label: 'Kaca Pecah',
      description: 'Shattered glass creating safety hazards'
    },
    { 
      value: 'electronic-waste', 
      label: 'Electronic Waste',
      description: 'Discarded electronics and appliances'
    },
    { 
      value: 'construction-debris', 
      label: 'Construction Debris',
      description: 'Building materials and construction waste'
    },
    { 
      value: 'organic-waste', 
      label: 'Organic Waste',
      description: 'Food scraps and biodegradable materials'
    },
    { 
      value: 'plastic-pollution', 
      label: 'Plastic Pollution',
      description: 'Plastic bags, bottles, and packaging waste'
    },
    { 
      value: 'medical-waste', 
      label: 'Medical Waste',
      description: 'Healthcare-related waste materials'
    },
    { 
      value: 'other', 
      label: 'Other',
      description: 'Waste type not listed above'
    }
  ];

  const getTypeIcon = (type) => {
    const iconMap = {
      'Pembuangan Ilegal': 'AlertTriangle',
      'Tempat Sampah Penuh': 'Trash2',
      'hazardous-materials': 'Shield',
      'broken-glass': 'ShieldAlert',
      'electronic-waste': 'Monitor',
      'construction-debris': 'HardHat',
      'organic-waste': 'Leaf',
      'plastic-pollution': 'Recycle',
      'medical-waste': 'Cross',
      'other': 'HelpCircle'
    };
    return iconMap?.[type] || 'AlertCircle';
  };

  const selectedTypeData = wasteTypes?.find(type => type?.value === selectedType);

  return (
    <div className="space-y-4">
      {/* ✅ Hanya satu Select — untuk waste_type */}
      <Select
        label="Jenis Masalah Sampah"
        description="Pilih kategori yang paling sesuai untuk masalah sampah."
        placeholder="Pilih jenis masalah..."
        options={wasteTypes}
        value={selectedType}
        onChange={onTypeChange}
        error={error}
        required
        searchable
      />

      {/* Preview */}
      {selectedTypeData && (
        <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
            <Icon 
              name={getTypeIcon(selectedType)} 
              size={20} 
              className="text-primary"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{selectedTypeData?.label}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedTypeData?.description}
            </p>
          </div>
        </div>
      )}

      {/* Alert */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-warning mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-warning">Penting</p>
            <p className="text-muted-foreground mt-1">
              Untuk bahaya kesehatan langsung atau keadaan darurat, segera hubungi layanan darurat di 112
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteTypeSelector;