import React, { useState, useMemo } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Pagination from '../../../../components/ui/Pagination';

const DataTable = ({ title, data, columns, onExport, className = '' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Filter data based on search query
  const filteredData = data?.filter(item =>
    Object.values(item)?.some(value =>
      value?.toString()?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    )
  );

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig?.key) return filteredData;

    return [...filteredData]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData?.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-subtle ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-border gap-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none">
            <Input
              type="search"
              placeholder="Search data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full sm:w-64"
            />
          </div>
          <Button
            variant="outline"
            iconName="Download"
            iconSize={16}
            onClick={onExport}
          >
            Export
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 transition-micro"
                  onClick={() => column?.sortable && handleSort(column?.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column?.label}</span>
                    {column?.sortable && (
                      <Icon
                        name={getSortIcon(column?.key)}
                        size={14}
                        className={sortConfig?.key === column?.key ? 'text-primary' : 'text-muted-foreground/60'}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData?.map((row, index) => (
              <tr key={index} className="hover:bg-muted/50 transition-micro">
                {columns?.map((column) => (
                  <td key={column?.key} className="px-4 py-3 text-sm">
                    {column?.render ? column?.render(row?.[column?.key], row) : row?.[column?.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Empty State */}
      {paginatedData?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground/40 mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No data found</h4>
          <p className="text-muted-foreground text-center max-w-md">
            {searchQuery ? 'Try adjusting your search terms or filters.' : 'No data available for the selected criteria.'}
          </p>
        </div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={sortedData?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newItemsPerPage) => {
              setItemsPerPage(newItemsPerPage);
              setCurrentPage(1);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;