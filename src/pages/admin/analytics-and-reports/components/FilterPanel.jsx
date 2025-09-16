import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import Select from '../../../../components/ui/Select';
import Input from '../../../../components/ui/Input';

const FilterPanel = ({ onFiltersChange, onRefresh, isLoading = false }) => {
  const [filters, setFilters] = useState({
    dateRange: '30',
    department: 'all',
    metric: 'requests',
    comparison: 'previous'
  });

  const dateRangeOptions = [
    { value: '7', label: '7 Hari Terakhir' },
    { value: '30', label: '30 Hari Terakhir' },
    { value: '90', label: '3 bulan terakhir' },
    { value: '365', label: 'Akhir tahun' },
    { value: 'custom', label: 'Custom range' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'collection', label: 'Pengumpulan Sampah' },
    { value: 'recycling', label: 'Layanan Daur Ulang' },
    { value: 'hazardous', label: 'Limbah Berbahaya' },
    { value: 'maintenance', label: 'Pemeliharaan Peralatan' }
  ];

  const metricOptions = [
    { value: 'requests', label: 'Permintaan Penjemputan' },
    { value: 'completion', label: 'Tingkat Penyelesaian' },
    { value: 'efficiency', label: 'Efisiensi Operasional' },
    { value: 'costs', label: 'Analisis Biaya' },
    { value: 'environmental', label: 'Dampak Lingkungan' }
  ];

  const comparisonOptions = [
    { value: 'previous', label: 'Periode Sebelumnya' },
    { value: 'year', label: 'Periode yang Sama Tahun Lalu' },
    { value: 'baseline', label: 'Rata-rata Dasar' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      dateRange: '30',
      department: 'all',
      metric: 'requests',
      comparison: 'previous'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-subtle mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Date Range */}
        <div className="flex-1">
          <Select
            label="Rentang Tanggal"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            className="w-full"
          />
        </div>

        {/* Department Filter */}
        <div className="flex-1">
          <Select
            label="Department"
            options={departmentOptions}
            value={filters?.department}
            onChange={(value) => handleFilterChange('department', value)}
            className="w-full"
          />
        </div>

        {/* Metric Type */}
        <div className="flex-1">
          <Select
            label="Primary Metric"
            options={metricOptions}
            value={filters?.metric}
            onChange={(value) => handleFilterChange('metric', value)}
            className="w-full"
          />
        </div>

        {/* Comparison Period */}
        <div className="flex-1">
          <Select
            label="Compare To"
            options={comparisonOptions}
            value={filters?.comparison}
            onChange={(value) => handleFilterChange('comparison', value)}
            className="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-end gap-2">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconSize={16}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="default"
            iconName="RefreshCw"
            iconSize={16}
            loading={isLoading}
            onClick={onRefresh}
          >
            Refresh
          </Button>
        </div>
      </div>
      {/* Custom Date Range */}
      {filters?.dateRange === 'custom' && (
        <div className="flex gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex-1">
            <Input
              label="Start Date"
              type="date"
              defaultValue="2024-08-01"
            />
          </div>
          <div className="flex-1">
            <Input
              label="End Date"
              type="date"
              defaultValue="2024-09-05"
            />
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground">Active filters:</span>
        {Object.entries(filters)?.map(([key, value]) => {
          if (value === 'all' || !value) return null;
          const label = key?.charAt(0)?.toUpperCase() + key?.slice(1);
          return (
            <span
              key={key}
              className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
            >
              {label}: {value}
              <button
                onClick={() => handleFilterChange(key, key === 'department' ? 'all' : '')}
                className="hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterPanel;