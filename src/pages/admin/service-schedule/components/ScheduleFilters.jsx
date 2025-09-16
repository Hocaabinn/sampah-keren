import React from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import Select from '../../../../components/ui/Select';
import Input from '../../../../components/ui/Input';

const ScheduleFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  staffMembers, 
  vehicles 
}) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const wasteTypeOptions = [
    { value: '', label: 'All Waste Types' },
    { value: 'organic', label: 'Organic Waste' },
    { value: 'recyclable', label: 'Recyclable' },
    { value: 'hazardous', label: 'Hazardous' },
    { value: 'general', label: 'General Waste' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const staffOptions = [
    { value: '', label: 'All Staff Members' },
    ...staffMembers?.map(staff => ({
      value: staff?.id,
      label: staff?.name
    }))
  ];

  const vehicleOptions = [
    { value: '', label: 'All Vehicles' },
    ...vehicles?.map(vehicle => ({
      value: vehicle?.id,
      label: `${vehicle?.type} - ${vehicle?.plateNumber}`
    }))
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Cari rute, lokasi...."
            value={filters?.search || ''}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Status Filter */}
        <Select
          options={statusOptions}
          value={filters?.status || ''}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Filter by status"
        />

        {/* Waste Type Filter */}
        <Select
          options={wasteTypeOptions}
          value={filters?.wasteType || ''}
          onChange={(value) => onFilterChange('wasteType', value)}
          placeholder="Filter berdasarkan jenis sampah"
        />

        {/* Staff Filter */}
        <Select
          options={staffOptions}
          value={filters?.staff || ''}
          onChange={(value) => onFilterChange('staff', value)}
          placeholder="Filter berdasarkan petugas"
          searchable
        />

        {/* Priority Filter */}
        <Select
          options={priorityOptions}
          value={filters?.priority || ''}
          onChange={(value) => onFilterChange('priority', value)}
          placeholder="Filter berdasarkan prioritas"
        />
      </div>
      {/* Advanced Filters Toggle */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
            Tanggal Mulai
            </label>
            <Input
              type="date"
              value={filters?.startDate || ''}
              onChange={(e) => onFilterChange('startDate', e?.target?.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Tanggal Akhir
            </label>
            <Input
              type="date"
              value={filters?.endDate || ''}
              onChange={(e) => onFilterChange('endDate', e?.target?.value)}
            />
          </div>

          {/* Vehicle Filter */}
          <Select
            label="Vehicle"
            options={vehicleOptions}
            value={filters?.vehicle || ''}
            onChange={(value) => onFilterChange('Kendaraan', value)}
            searchable
          />

          {/* Time Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
            Rentang Waktu
            </label>
            <Select
              options={[
                { value: '', label: 'All Times' },
                { value: 'morning', label: 'Morning (6AM-12PM)' },
                { value: 'afternoon', label: 'Afternoon (12PM-6PM)' },
                { value: 'evening', label: 'Evening (6PM-10PM)' }
              ]}
              value={filters?.timeRange || ''}
              onChange={(value) => onFilterChange('timeRange', value)}
            />
          </div>
        </div>
      </div>
      {/* Quick Filter Buttons */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground">Quick Filters:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFilterChange('status', 'pending')}
            className={filters?.status === 'pending' ? 'bg-primary/10 text-primary' : ''}
          >
            Hanya Tertunda
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFilterChange('status', 'in-progress')}
            className={filters?.status === 'in-progress' ? 'bg-warning/10 text-warning' : ''}
          >
            Sedang Diproses
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFilterChange('priority', 'high')}
            className={filters?.priority === 'high' ? 'bg-error/10 text-error' : ''}
          >
            Prioritas Tinggi
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const today = new Date()?.toISOString()?.split('T')?.[0];
              onFilterChange('startDate', today);
              onFilterChange('endDate', today);
            }}
            className={filters?.startDate === new Date()?.toISOString()?.split('T')?.[0] ? 'bg-accent/10 text-accent' : ''}
          >
            Hanya Hari Ini
          </Button>
        </div>
      </div>
      {/* Filter Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Info" size={14} />
            <span>
              Active filters: {Object.entries(filters)?.filter(([_, value]) => value !== '')?.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleFilters;