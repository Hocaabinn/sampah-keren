import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';
import { Checkbox } from '../../../../components/ui/Checkbox';
import Icon from '../../../../components/AppIcon';

const ReportFilters = ({ onFiltersChange, activeFilters, resultCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    route: '',
    wasteTypes: [],
    staffAssignment: '',
    status: ''
  });

  const routeOptions = [
    { value: '', label: 'All Routes' },
    { value: 'route-001', label: 'Route 001 - Downtown' },
    { value: 'route-002', label: 'Route 002 - Residential North' },
    { value: 'route-003', label: 'Route 003 - Industrial Zone' },
    { value: 'route-004', label: 'Route 004 - Commercial District' },
    { value: 'route-005', label: 'Route 005 - Suburban East' }
  ];

  const staffOptions = [
    { value: '', label: 'All Staff' },
    { value: 'team-alpha', label: 'Team Alpha' },
    { value: 'team-beta', label: 'Team Beta' },
    { value: 'team-gamma', label: 'Team Gamma' },
    { value: 'team-delta', label: 'Team Delta' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const wasteTypeOptions = [
    { id: 'Umum', label: 'Umum' },
    { id: 'Dapat Didaur Ulang', label: 'Dapat Didaur Ulang' },
    { id: 'organik', label: 'Organik' },
    { id: 'Berbahaya', label: 'Berbahaya' },
    { id: 'electronik', label: 'Electronik' },
    { id: 'konstruksi', label: 'konstruksi' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleWasteTypeChange = (typeId, checked) => {
    const newWasteTypes = checked 
      ? [...filters?.wasteTypes, typeId]
      : filters?.wasteTypes?.filter(id => id !== typeId);
    
    handleFilterChange('wasteTypes', newWasteTypes);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateFrom: '',
      dateTo: '',
      route: '',
      wasteTypes: [],
      staffAssignment: '',
      status: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.dateFrom || filters?.dateTo) count++;
    if (filters?.route) count++;
    if (filters?.wasteTypes?.length > 0) count++;
    if (filters?.staffAssignment) count++;
    if (filters?.status) count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-foreground">Filter Laporan</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Filter" size={16} />
            <span>{resultCount} hasil ditemukan</span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
                {getActiveFilterCount()} active
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconSize={16}
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
          >
            {isExpanded ? 'Less Filters' : 'Filter Lainnya'}
          </Button>
        </div>
      </div>
      {/* Basic Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          type="date"
          label="Dari Tanggal"
          value={filters?.dateFrom}
          onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
        />
        <Input
          type="date"
          label="Sampai Tanggal"
          value={filters?.dateTo}
          onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
        />
        <Select
          label="Rute"
          options={routeOptions}
          value={filters?.route}
          onChange={(value) => handleFilterChange('route', value)}
        />
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
      </div>
      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Select
                label="Staff Assignment"
                options={staffOptions}
                value={filters?.staffAssignment}
                onChange={(value) => handleFilterChange('staffAssignment', value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Waste Types
              </label>
              <div className="grid grid-cols-2 gap-2">
                {wasteTypeOptions?.map((type) => (
                  <Checkbox
                    key={type?.id}
                    label={type?.label}
                    checked={filters?.wasteTypes?.includes(type?.id)}
                    onChange={(e) => handleWasteTypeChange(type?.id, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportFilters;