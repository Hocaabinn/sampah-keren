import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import Icon from '../../../../components/AppIcon';
import Pagination from '../../../../components/ui/Pagination';

const ReportTable = ({ reports, onEdit, onDelete, onView }) => {
  const [sortField, setSortField] = useState('collectionDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedReports = [...reports]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === 'collectionDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (sortField === 'totalWaste') {
      aValue = Object.values(a?.wasteCategories)?.reduce((sum, cat) => sum + cat?.collected, 0);
      bValue = Object.values(b?.wasteCategories)?.reduce((sum, cat) => sum + cat?.collected, 0);
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedReports = sortedReports?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success text-success-foreground', label: 'Selesai' },
      'in-progress': { color: 'bg-warning text-warning-foreground', label: 'Sedang Diproses' },
      pending: { color: 'bg-accent text-accent-foreground', label: 'Tertunda' },
      cancelled: { color: 'bg-error text-error-foreground', label: 'Dibaatalkan' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateTotalWaste = (wasteCategories) => {
    return Object.values(wasteCategories)?.reduce((sum, cat) => sum + cat?.collected, 0);
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-micro"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        <Icon 
          name={sortField === field ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
          size={14} 
        />
      </div>
    </th>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <SortableHeader field="reportId">ID Laporan</SortableHeader>
              <SortableHeader field="collectionDate">Nama Pelapor</SortableHeader>
              <SortableHeader field="collectionDate">Tanggal</SortableHeader>
              <SortableHeader field="route">Lokasi</SortableHeader>
              <SortableHeader field="totalWaste">Jenis Sampah</SortableHeader>
              <SortableHeader field="staffAssignment">Petugas</SortableHeader>
              <SortableHeader field="completionStatus">Status</SortableHeader>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {paginatedReports?.map((report) => (
              <tr key={report?.reportId} className="hover:bg-muted/30 transition-micro">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">
                    {report?.reportId}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">
                    {formatDate(report?.collectionDate)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">
                    {report?.route?.replace('route-', 'Route ')?.toUpperCase()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">
                    {calculateTotalWaste(report?.wasteCategories)?.toFixed(1)} kg
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(report?.wasteCategories)?.filter(([_, data]) => data?.collected > 0)?.slice(0, 3)?.map(([category, data]) => (
                        <span
                          key={category}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                        >
                          {category}: {data?.collected}kg
                        </span>
                      ))}
                    {Object.entries(report?.wasteCategories)?.filter(([_, data]) => data?.collected > 0)?.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{Object.entries(report?.wasteCategories)?.filter(([_, data]) => data?.collected > 0)?.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">
                    {report?.staffAssignment?.replace('team-', 'Team ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(report?.completionStatus)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(report)}
                      iconName="Eye"
                      iconSize={16}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <span className="sr-only">View report</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(report)}
                      iconName="Edit"
                      iconSize={16}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <span className="sr-only">Edit report</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(report)}
                      iconName="Trash2"
                      iconSize={16}
                      className="text-muted-foreground hover:text-error"
                    >
                      <span className="sr-only">Delete report</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {paginatedReports?.map((report) => (
          <div key={report?.reportId} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  {report?.reportId}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {formatDate(report?.collectionDate)}
                </p>
              </div>
              {getStatusBadge(report?.completionStatus)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Rute</p>
                <p className="font-medium text-foreground">
                  {report?.route?.replace('route-', 'Route ')?.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Sampah</p>
                <p className="font-medium text-foreground">
                  {calculateTotalWaste(report?.wasteCategories)?.toFixed(1)} kg
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Staff</p>
                <p className="font-medium text-foreground">
                  {report?.staffAssignment?.replace('team-', 'Team ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Categories</p>
                <p className="font-medium text-foreground">
                  {Object.entries(report?.wasteCategories)?.filter(([_, data]) => data?.collected > 0)?.length} types
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(report)}
                iconName="Eye"
                iconSize={16}
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(report)}
                iconName="Edit"
                iconSize={16}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(report)}
                iconName="Trash2"
                iconSize={16}
                className="text-error hover:text-error"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-border">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(reports?.length / itemsPerPage)}
          totalItems={reports?.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(newSize) => {
            setItemsPerPage(newSize);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default ReportTable;