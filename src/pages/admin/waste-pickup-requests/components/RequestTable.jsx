import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import Select from '../../../../components/ui/Select';
import Icon from '../../../../components/AppIcon';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

const RequestTable = ({ 
  requests = [], 
  onEdit, 
  onDelete, 
  onView, 
  onStatusChange,
  sortConfig,
  onSort 
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSort = (column) => {
    const direction = sortConfig?.column === column && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSort?.({ column, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(requests?.map(req => req?.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows?.filter(rowId => rowId !== id));
    }
  };

  const handleBulkStatusChange = (status) => {
    selectedRows?.forEach(id => {
      onStatusChange?.(id, status);
    });
    setSelectedRows([]);
  };

  const getSortIcon = (column) => {
    if (sortConfig?.column !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  if (requests?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <Icon name="Truck" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Pickup Requests Found</h3>
        <p className="text-muted-foreground mb-6">
          No waste pickup requests match your current filters. Try adjusting your search criteria or create a new request.
        </p>
        <Button variant="default" iconName="Plus" iconPosition="left">
          Create New Request
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedRows?.length > 0 && (
        <div className="bg-primary/5 border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedRows?.length} request{selectedRows?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <Select
                options={statusOptions}
                value=""
                onChange={handleBulkStatusChange}
                placeholder="Change Status"
                className="w-40"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRows([])}
                iconName="X"
                iconSize={16}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedRows?.length === requests?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('requestId')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  Request ID
                  <Icon name={getSortIcon('requestId')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('citizen')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  Warga
                  <Icon name={getSortIcon('citizen')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('address')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                 Alamat
                  <Icon name={getSortIcon('address')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('wasteType')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                 Jenis sampah
                  <Icon name={getSortIcon('wasteType')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('priority')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  Prioritas
                  <Icon name={getSortIcon('priority')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  Status
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('scheduledDate')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                 Tanggal Terjadwal
                  <Icon name={getSortIcon('scheduledDate')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests?.map((request) => (
              <tr key={request?.id} className="border-b border-border hover:bg-muted/30 transition-micro">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows?.includes(request?.id)}
                    onChange={(e) => handleSelectRow(request?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-primary font-medium">
                    #{request?.requestId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{request?.citizenName}</p>
                      <p className="text-xs text-muted-foreground">{request?.citizenPhone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-48">
                    <p className="text-sm text-foreground truncate">{request?.address}</p>
                    <p className="text-xs text-muted-foreground">{request?.district}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Icon name={request?.wasteIcon} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{request?.wasteType}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <PriorityBadge priority={request?.priority} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={request?.status} />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-foreground">{request?.scheduledDate}</p>
                    <p className="text-xs text-muted-foreground">{request?.scheduledTime}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView?.(request)}
                      iconName="Eye"
                      iconSize={16}
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <span className="sr-only">View request</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit?.(request)}
                      iconName="Edit"
                      iconSize={16}
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <span className="sr-only">Edit request</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete?.(request)}
                      iconName="Trash2"
                      iconSize={16}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <span className="sr-only">Delete request</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {requests?.map((request) => (
          <div key={request?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedRows?.includes(request?.id)}
                  onChange={(e) => handleSelectRow(request?.id, e?.target?.checked)}
                  className="rounded border-border"
                />
                <span className="font-mono text-sm text-primary font-medium">
                  #{request?.requestId}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={request?.status} />
                <PriorityBadge priority={request?.priority} />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{request?.citizenName}</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-foreground">{request?.address}</p>
                  <p className="text-xs text-muted-foreground">{request?.district}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name={request?.wasteIcon} size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{request?.wasteType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {request?.scheduledDate} at {request?.scheduledTime}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">{request?.citizenPhone}</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView?.(request)}
                  iconName="Eye"
                  iconSize={16}
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit?.(request)}
                  iconName="Edit"
                  iconSize={16}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete?.(request)}
                  iconName="Trash2"
                  iconSize={16}
                  className="text-destructive hover:bg-destructive/10"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestTable;