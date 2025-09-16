import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import { Checkbox } from '../../../../components/ui/Checkbox';

const StaffTable = ({ 
  staff, 
  selectedStaff, 
  onSelectStaff, 
  onSelectAll, 
  onViewStaff, 
  onEditStaff, 
  onDeleteStaff,
  sortConfig,
  onSort 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    onSort({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Aktif' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Tidak Aktif' },
      on_leave: { color: 'bg-warning text-warning-foreground', label: 'Cuti' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getAssignmentBadge = (assignment) => {
    const assignmentConfig = {
      available: { color: 'bg-success text-success-foreground', label: 'Tersedia' },
      assigned: { color: 'bg-primary text-primary-foreground', label: 'Ditugaskan' },
      busy: { color: 'bg-error text-error-foreground', label: 'Sibuk' }
    };
    
    const config = assignmentConfig?.[assignment] || assignmentConfig?.available;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedStaff?.length === staff?.length && staff?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="mx-auto"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('staffId')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  Staff ID
                  {getSortIcon('staffId')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  Name
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('role')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  Role
                  {getSortIcon('role')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  Department
                  {getSortIcon('department')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">Kontak</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Penugasan</th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('performance')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  Kinerja
                  {getSortIcon('performance')}
                </button>
              </th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff?.map((member) => (
              <tr
                key={member?.id}
                className={`border-b border-border hover:bg-muted/30 transition-micro ${
                  selectedStaff?.includes(member?.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(member?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedStaff?.includes(member?.id)}
                    onChange={(e) => onSelectStaff(member?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-mono text-primary">{member?.staffId}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {member?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{member?.name}</p>
                      <p className="text-xs text-muted-foreground">{member?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{member?.role}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{member?.department}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <p className="text-foreground">{member?.phone}</p>
                    <p className="text-muted-foreground text-xs">{member?.emergencyContact}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(member?.status)}
                </td>
                <td className="px-4 py-3">
                  {getAssignmentBadge(member?.assignmentStatus)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${getPerformanceColor(member?.performance?.score)}`}>
                      {member?.performance?.score}%
                    </span>
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          member?.performance?.score >= 90 ? 'bg-success' :
                          member?.performance?.score >= 75 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${member?.performance?.score}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewStaff(member)}
                      className="h-8 w-8"
                      iconName="Eye"
                      iconSize={14}
                    >
                      <span className="sr-only">View staff</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditStaff(member)}
                      className="h-8 w-8"
                      iconName="Edit"
                      iconSize={14}
                    >
                      <span className="sr-only">Edit staff</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteStaff(member)}
                      className="h-8 w-8 text-error hover:text-error hover:bg-error/10"
                      iconName="Trash2"
                      iconSize={14}
                    >
                      <span className="sr-only">Delete staff</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {staff?.map((member) => (
          <div
            key={member?.id}
            className={`bg-card border border-border rounded-lg p-4 ${
              selectedStaff?.includes(member?.id) ? 'ring-2 ring-primary/20 border-primary/30' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedStaff?.includes(member?.id)}
                  onChange={(e) => onSelectStaff(member?.id, e?.target?.checked)}
                />
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {member?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{member?.name}</h3>
                  <p className="text-xs text-muted-foreground">{member?.staffId}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewStaff(member)}
                  className="h-8 w-8"
                  iconName="Eye"
                  iconSize={14}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditStaff(member)}
                  className="h-8 w-8"
                  iconName="Edit"
                  iconSize={14}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteStaff(member)}
                  className="h-8 w-8 text-error"
                  iconName="Trash2"
                  iconSize={14}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Role</p>
                <p className="text-foreground font-medium">{member?.role}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Department</p>
                <p className="text-foreground font-medium">{member?.department}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                {getStatusBadge(member?.status)}
              </div>
              <div>
                <p className="text-muted-foreground">Assignment</p>
                {getAssignmentBadge(member?.assignmentStatus)}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Performance Score</p>
                  <span className={`text-sm font-medium ${getPerformanceColor(member?.performance?.score)}`}>
                    {member?.performance?.score}%
                  </span>
                </div>
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      member?.performance?.score >= 90 ? 'bg-success' :
                      member?.performance?.score >= 75 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${member?.performance?.score}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {staff?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No staff members found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or add new staff members.</p>
        </div>
      )}
    </div>
  );
};

export default StaffTable;