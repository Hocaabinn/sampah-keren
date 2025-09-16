import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import Select from '../../../../components/ui/Select';
import Input from '../../../../components/ui/Input';
import Icon from '../../../../components/AppIcon';

const RequestFilters = ({ onFiltersChange, totalResults = 0 }) => {
  const [filters, setFilters] = useState({
    status: '',
    wasteType: '',
    dateFrom: '',
    dateTo: '',
    priority: ''
  });

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const wasteTypeOptions = [
    { value: '', label: 'All Waste Types' },
    { value: 'household', label: 'Household Waste' },
    { value: 'recyclable', label: 'Recyclable Materials' },
    { value: 'organic', label: 'Organic Waste' },
    { value: 'electronic', label: 'Electronic Waste' },
    { value: 'hazardous', label: 'Hazardous Materials' },
    { value: 'bulk', label: 'Bulk Items' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'low', label: 'Perioritas Rendah' },
    { value: 'medium', label: 'Perioritas Menengah' },
    { value: 'high', label: 'Perioritas Tinggi' },
    { value: 'urgent', label: 'Darurat' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      status: '',
      wasteType: '',
      dateFrom: '',
      dateTo: '',
      priority: ''
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Filter permintaan</h3>
          <span className="text-sm text-muted-foreground">
            ({totalResults} Hasil)
          </span>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Clear All Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          className="w-full"
        />

        <Select
          label="Jenis Sampah"
          options={wasteTypeOptions}
          value={filters?.wasteType}
          onChange={(value) => handleFilterChange('wasteType', value)}
          className="w-full"
        />

        <Input
          label="Dari Tanggal"
          type="date"
          value={filters?.dateFrom}
          onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
          className="w-full"
        />

        <Input
          label="Sampai Tanggal"
          type="date"
          value={filters?.dateTo}
          onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
          className="w-full"
        />

        <Select
          label="Prioritas"
          options={priorityOptions}
          value={filters?.priority}
          onChange={(value) => handleFilterChange('priority', value)}
          className="w-full"
        />
      </div>
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters?.status && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
              <button
                onClick={() => handleFilterChange('status', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {filters?.wasteType && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Type: {wasteTypeOptions?.find(opt => opt?.value === filters?.wasteType)?.label}
              <button
                onClick={() => handleFilterChange('wasteType', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {filters?.priority && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Priority: {priorityOptions?.find(opt => opt?.value === filters?.priority)?.label}
              <button
                onClick={() => handleFilterChange('priority', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestFilters;