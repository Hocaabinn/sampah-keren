import React from 'react';

import Button from './Button';
import Select from './Select';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
  showJumpToPage = true,
  className = ''
}) => {
  const pageSizeOptions = [
    { value: '10', label: '10 per page' },
    { value: '25', label: '25 per page' },
    { value: '50', label: '50 per page' },
    { value: '100', label: '100 per page' }
  ];

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const handleItemsPerPageChange = (value) => {
    onItemsPerPageChange?.(parseInt(value));
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1 && !showItemsPerPage) {
    return null;
  }

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Items per page selector */}
      {showItemsPerPage && (
        <div className="flex items-center gap-2">
          <Select
            options={pageSizeOptions}
            value={itemsPerPage?.toString()}
            onChange={handleItemsPerPageChange}
            className="w-32"
          />
        </div>
      )}
      {/* Results info */}
      <div className="text-sm text-muted-foreground">
        Showing {startItem}-{endItem} of {totalItems} results
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {/* Previous button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconSize={16}
            className="px-2"
          >
            <span className="sr-only">Previous page</span>
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {getVisiblePages()?.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-2 py-1 text-muted-foreground">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="min-w-[32px] px-2"
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconSize={16}
            className="px-2"
          >
            <span className="sr-only">Next page</span>
          </Button>

          {/* Jump to page (desktop only) */}
          {showJumpToPage && totalPages > 10 && (
            <div className="hidden md:flex items-center gap-2 ml-4">
              <span className="text-sm text-muted-foreground">Go to:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                className="w-16 px-2 py-1 text-sm border border-border rounded bg-input text-foreground"
                onKeyDown={(e) => {
                  if (e?.key === 'Enter') {
                    const page = parseInt(e?.target?.value);
                    if (page >= 1 && page <= totalPages) {
                      handlePageChange(page);
                      e.target.value = '';
                    }
                  }
                }}
                placeholder={currentPage?.toString()}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pagination;