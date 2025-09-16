import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';
import { Checkbox } from '../../../../components/ui/Checkbox';
import Icon from '../../../../components/AppIcon';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    dateRange: {
      from: '',
      to: ''
    },
    includeFields: {
      reportId: true,
      collectionDate: true,
      route: true,
      wasteCategories: true,
      staffAssignment: true,
      vehicleInfo: true,
      completionStatus: true,
      notes: false,
      photos: false
    },
    groupBy: 'none',
    sortBy: 'collectionDate',
    sortOrder: 'desc'
  });

  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV File' }
  ];

  const groupByOptions = [
    { value: 'none', label: 'No Grouping' },
    { value: 'route', label: 'Group by Route' },
    { value: 'date', label: 'Group by Date' },
    { value: 'staff', label: 'Group by Staff' },
    { value: 'status', label: 'Group by Status' }
  ];

  const sortByOptions = [
    { value: 'collectionDate', label: 'Collection Date' },
    { value: 'reportId', label: 'Report ID' },
    { value: 'route', label: 'Route' },
    { value: 'totalWaste', label: 'Total Waste' },
    { value: 'staffAssignment', label: 'Staff Assignment' }
  ];

  const sortOrderOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
  ];

  const handleFieldToggle = (field, checked) => {
    setExportConfig(prev => ({
      ...prev,
      includeFields: {
        ...prev?.includeFields,
        [field]: checked
      }
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      await onExport(exportConfig);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getSelectedFieldsCount = () => {
    return Object.values(exportConfig?.includeFields)?.filter(Boolean)?.length;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Export Reports</h2>
              <p className="text-sm text-muted-foreground">
                Customize and download waste collection reports
              </p>
            </div>
          </div>
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

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6">
          {/* Export Format */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Export Format</h3>
            <Select
              label="File Format"
              options={formatOptions}
              value={exportConfig?.format}
              onChange={(value) => setExportConfig(prev => ({ ...prev, format: value }))}
              description="Choose the format for your exported report"
            />
          </div>

          {/* Date Range */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Date Range</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                label="From Date"
                value={exportConfig?.dateRange?.from}
                onChange={(e) => setExportConfig(prev => ({
                  ...prev,
                  dateRange: { ...prev?.dateRange, from: e?.target?.value }
                }))}
              />
              <Input
                type="date"
                label="To Date"
                value={exportConfig?.dateRange?.to}
                onChange={(e) => setExportConfig(prev => ({
                  ...prev,
                  dateRange: { ...prev?.dateRange, to: e?.target?.value }
                }))}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Leave empty to include all reports
            </p>
          </div>

          {/* Include Fields */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">
              Include Fields ({getSelectedFieldsCount()} selected)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Checkbox
                label="Report ID"
                checked={exportConfig?.includeFields?.reportId}
                onChange={(e) => handleFieldToggle('reportId', e?.target?.checked)}
              />
              <Checkbox
                label="Collection Date"
                checked={exportConfig?.includeFields?.collectionDate}
                onChange={(e) => handleFieldToggle('collectionDate', e?.target?.checked)}
              />
              <Checkbox
                label="Route Information"
                checked={exportConfig?.includeFields?.route}
                onChange={(e) => handleFieldToggle('route', e?.target?.checked)}
              />
              <Checkbox
                label="Waste Categories"
                checked={exportConfig?.includeFields?.wasteCategories}
                onChange={(e) => handleFieldToggle('wasteCategories', e?.target?.checked)}
              />
              <Checkbox
                label="Staff Assignment"
                checked={exportConfig?.includeFields?.staffAssignment}
                onChange={(e) => handleFieldToggle('staffAssignment', e?.target?.checked)}
              />
              <Checkbox
                label="Vehicle Information"
                checked={exportConfig?.includeFields?.vehicleInfo}
                onChange={(e) => handleFieldToggle('vehicleInfo', e?.target?.checked)}
              />
              <Checkbox
                label="Completion Status"
                checked={exportConfig?.includeFields?.completionStatus}
                onChange={(e) => handleFieldToggle('completionStatus', e?.target?.checked)}
              />
              <Checkbox
                label="Notes"
                checked={exportConfig?.includeFields?.notes}
                onChange={(e) => handleFieldToggle('notes', e?.target?.checked)}
              />
              <Checkbox
                label="Photo Documentation"
                checked={exportConfig?.includeFields?.photos}
                onChange={(e) => handleFieldToggle('photos', e?.target?.checked)}
                description="Available only in PDF format"
                disabled={exportConfig?.format !== 'pdf'}
              />
            </div>
          </div>

          {/* Formatting Options */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Formatting Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Group By"
                options={groupByOptions}
                value={exportConfig?.groupBy}
                onChange={(value) => setExportConfig(prev => ({ ...prev, groupBy: value }))}
              />
              <Select
                label="Sort By"
                options={sortByOptions}
                value={exportConfig?.sortBy}
                onChange={(value) => setExportConfig(prev => ({ ...prev, sortBy: value }))}
              />
              <Select
                label="Sort Order"
                options={sortOrderOptions}
                value={exportConfig?.sortOrder}
                onChange={(value) => setExportConfig(prev => ({ ...prev, sortOrder: value }))}
              />
            </div>
          </div>

          {/* Preview Information */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Export Preview</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Format: {formatOptions?.find(f => f?.value === exportConfig?.format)?.label}</li>
                  <li>• Fields: {getSelectedFieldsCount()} columns included</li>
                  <li>• Grouping: {groupByOptions?.find(g => g?.value === exportConfig?.groupBy)?.label}</li>
                  <li>• Sorting: {sortByOptions?.find(s => s?.value === exportConfig?.sortBy)?.label} ({exportConfig?.sortOrder})</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
          <div className="text-sm text-muted-foreground">
            Export will include all matching reports based on your filters
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconSize={16}
              disabled={getSelectedFieldsCount() === 0}
            >
              Export Reports
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;