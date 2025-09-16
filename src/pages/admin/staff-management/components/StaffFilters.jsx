import React from 'react';
import Select from '../../../../components/ui/Select';
import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';
import Icon from '../../../../components/AppIcon';

const StaffFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  searchQuery, 
  onSearchChange 
}) => {
  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'collection', label: 'Collection Services' },
    { value: 'recycling', label: 'Recycling Operations' },
    { value: 'maintenance', label: 'Vehicle Maintenance' },
    { value: 'administration', label: 'Administration' },
    { value: 'customer_service', label: 'Customer Service' }
  ];

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'driver', label: 'Driver' },
    { value: 'collector', label: 'Waste Collector' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'coordinator', label: 'Route Coordinator' },
    { value: 'mechanic', label: 'Mechanic' },
    { value: 'admin', label: 'Administrator' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Tidak Aktif' },
    { value: 'on_leave', label: 'Cuti' }
  ];

  const assignmentOptions = [
    { value: '', label: 'All Assignments' },
    { value: 'available', label: 'Tersedia' },
    { value: 'assigned', label: 'Ditugaskan' },
    { value: 'busy', label: 'Sibuk' }
  ];

  const hasActiveFilters = filters?.department || filters?.role || filters?.status || filters?.assignment || searchQuery;

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 lg:max-w-xs">
          <Input
            type="search"
            placeholder="Search staff by name, ID, email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <Select
            options={departmentOptions}
            value={filters?.department}
            onChange={(value) => onFilterChange('department', value)}
            placeholder="Department"
            className="sm:w-48"
          />

          <Select
            options={roleOptions}
            value={filters?.role}
            onChange={(value) => onFilterChange('role', value)}
            placeholder="Role"
            className="sm:w-40"
          />

          <Select
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
            placeholder="Status"
            className="sm:w-36"
          />

          <Select
            options={assignmentOptions}
            value={filters?.assignment}
            onChange={(value) => onFilterChange('assignment', value)}
            placeholder="Assignment"
            className="sm:w-36"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
            className="sm:w-auto"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              Search: "{searchQuery}"
              <button
                onClick={() => onSearchChange('')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {filters?.department && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              Dept: {departmentOptions?.find(opt => opt?.value === filters?.department)?.label}
              <button
                onClick={() => onFilterChange('department', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {filters?.role && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              Peran: {roleOptions?.find(opt => opt?.value === filters?.role)?.label}
              <button
                onClick={() => onFilterChange('role', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {filters?.status && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
              <button
                onClick={() => onFilterChange('status', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {filters?.assignment && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              Penugasan: {assignmentOptions?.find(opt => opt?.value === filters?.assignment)?.label}
              <button
                onClick={() => onFilterChange('assignment', '')}
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

export default StaffFilters;