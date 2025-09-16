import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import Pagination from '../../../components/ui/Pagination';
import Button from '../../../components/ui/Button';

import StaffTable from '././components/StaffTable';
import StaffFilters from '././components/StaffFilters';
import StaffModal from '././components/StaffModal';
import DeleteConfirmModal from '././components/DeleteConfirmModal';
import BulkActionsBar from '././components/BulkActionsBar';
import StaffStats from '././components/StaffStats';

const StaffManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Staff data state
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [staffModal, setStaffModal] = useState({ isOpen: false, staff: null, mode: 'add' });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, staff: null });
  
  // Filter and search states
  const [filters, setFilters] = useState({
    department: '',
    role: '',
    status: '',
    assignment: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  // Table states
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock staff data
  useEffect(() => {
    const mockStaff = [
      {
        id: 1,
        staffId: 'ST001',
        name: 'John Martinez',
        email: 'john.martinez@ecowaste.gov',
        phone: '(555) 123-4567',
        emergencyContact: '(555) 987-6543',
        role: 'driver',
        department: 'collection',
        status: 'active',
        assignmentStatus: 'assigned',
        hireDate: '2022-03-15',
        address: '123 Oak Street, Springfield, IL 62701',
        licenseNumber: 'CDL-A-12345',
        certifications: ['cdl_a', 'safety'],
        currentRoute: 'Route 15 - Maple District',
        performance: {
          score: 92,
          completedTasks: 156,
          feedbackRating: 4.8
        },
        systemAccess: {
          dashboard: true,
          requests: true,
          schedule: true,
          reports: false
        }
      },
      {
        id: 2,
        staffId: 'ST002',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@ecowaste.gov',
        phone: '(555) 234-5678',
        emergencyContact: '(555) 876-5432',
        role: 'supervisor',
        department: 'collection',
        status: 'active',
        assignmentStatus: 'available',
        hireDate: '2021-08-22',
        address: '456 Pine Avenue, Springfield, IL 62702',
        licenseNumber: 'CDL-B-67890',
        certifications: ['cdl_b', 'safety', 'first_aid'],
        performance: {
          score: 96,
          completedTasks: 203,
          feedbackRating: 4.9
        },
        systemAccess: {
          dashboard: true,
          requests: true,
          schedule: true,
          reports: true
        }
      },
      {
        id: 3,
        staffId: 'ST003',
        name: 'Michael Chen',
        email: 'michael.chen@ecowaste.gov',
        phone: '(555) 345-6789',
        emergencyContact: '(555) 765-4321',
        role: 'collector',
        department: 'collection',
        status: 'active',
        assignmentStatus: 'busy',
        hireDate: '2023-01-10',
        address: '789 Elm Drive, Springfield, IL 62703',
        licenseNumber: '',
        certifications: ['safety'],
        currentRoute: 'Route 8 - Downtown',
        performance: {
          score: 88,
          completedTasks: 89,
          feedbackRating: 4.6
        },
        systemAccess: {
          dashboard: false,
          requests: true,
          schedule: true,
          reports: false
        }
      },
      {
        id: 4,
        staffId: 'ST004',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@ecowaste.gov',
        phone: '(555) 456-7890',
        emergencyContact: '(555) 654-3210',
        role: 'coordinator',
        department: 'administration',
        status: 'active',
        assignmentStatus: 'available',
        hireDate: '2020-11-05',
        address: '321 Birch Lane, Springfield, IL 62704',
        licenseNumber: '',
        certifications: ['safety', 'first_aid'],
        performance: {
          score: 94,
          completedTasks: 178,
          feedbackRating: 4.7
        },
        systemAccess: {
          dashboard: true,
          requests: true,
          schedule: true,
          reports: true
        }
      },
      {
        id: 5,
        staffId: 'ST005',
        name: 'David Thompson',
        email: 'david.thompson@ecowaste.gov',
        phone: '(555) 567-8901',
        emergencyContact: '(555) 543-2109',
        role: 'mechanic',
        department: 'maintenance',
        status: 'Cuti',
        assignmentStatus: 'available',
        hireDate: '2019-06-18',
        address: '654 Cedar Court, Springfield, IL 62705',
        licenseNumber: '',
        certifications: ['safety'],
        performance: {
          score: 91,
          completedTasks: 234,
          feedbackRating: 4.8
        },
        systemAccess: {
          dashboard: false,
          requests: false,
          schedule: true,
          reports: false
        }
      },
      {
        id: 6,
        staffId: 'ST006',
        name: 'Lisa Wang',
        email: 'lisa.wang@ecowaste.gov',
        phone: '(555) 678-9012',
        emergencyContact: '(555) 432-1098',
        role: 'admin',
        department: 'administration',
        status: 'active',
        assignmentStatus: 'available',
        hireDate: '2021-02-14',
        address: '987 Maple Street, Springfield, IL 62706',
        licenseNumber: '',
        certifications: ['safety', 'first_aid'],
        performance: {
          score: 97,
          completedTasks: 145,
          feedbackRating: 4.9
        },
        systemAccess: {
          dashboard: true,
          requests: true,
          schedule: true,
          reports: true
        }
      },
      {
        id: 7,
        staffId: 'ST007',
        name: 'Robert Garcia',
        email: 'robert.garcia@ecowaste.gov',
        phone: '(555) 789-0123',
        emergencyContact: '(555) 321-0987',
        role: 'driver',
        department: 'recycling',
        status: 'active',
        assignmentStatus: 'assigned',
        hireDate: '2022-09-30',
        address: '147 Willow Way, Springfield, IL 62707',
        licenseNumber: 'CDL-A-54321',
        certifications: ['cdl_a', 'hazmat', 'safety'],
        currentRoute: 'Route 22 - Industrial Zone',
        performance: {
          score: 85,
          completedTasks: 112,
          feedbackRating: 4.5
        },
        systemAccess: {
          dashboard: false,
          requests: true,
          schedule: true,
          reports: false
        }
      },
      {
        id: 8,
        staffId: 'ST008',
        name: 'Jennifer Brown',
        email: 'jennifer.brown@ecowaste.gov',
        phone: '(555) 890-1234',
        emergencyContact: '(555) 210-9876',
        role: 'collector',
        department: 'recycling',
        status: 'inactive',
        assignmentStatus: 'available',
        hireDate: '2023-04-12',
        address: '258 Spruce Street, Springfield, IL 62708',
        licenseNumber: '',
        certifications: ['safety'],
        performance: {
          score: 78,
          completedTasks: 45,
          feedbackRating: 4.2
        },
        systemAccess: {
          dashboard: false,
          requests: false,
          schedule: false,
          reports: false
        }
      }
    ];

    setTimeout(() => {
      setStaff(mockStaff);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtered and sorted staff
  const filteredAndSortedStaff = useMemo(() => {
    let filtered = staff?.filter(member => {
      const matchesSearch = !searchQuery || 
        member?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        member?.staffId?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        member?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      
      const matchesDepartment = !filters?.department || member?.department === filters?.department;
      const matchesRole = !filters?.role || member?.role === filters?.role;
      const matchesStatus = !filters?.status || member?.status === filters?.status;
      const matchesAssignment = !filters?.assignment || member?.assignmentStatus === filters?.assignment;

      return matchesSearch && matchesDepartment && matchesRole && matchesStatus && matchesAssignment;
    });

    // Sort
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'performance') {
        aValue = a?.performance?.score;
        bValue = b?.performance?.score;
      }

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [staff, searchQuery, filters, sortConfig]);

  // Paginated staff
  const paginatedStaff = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedStaff?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedStaff, currentPage, itemsPerPage]);

  // Event handlers
  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ department: '', role: '', status: '', assignment: '' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (sortConfig) => {
    setSortConfig(sortConfig);
  };

  const handleSelectStaff = (staffId, checked) => {
    if (checked) {
      setSelectedStaff(prev => [...prev, staffId]);
    } else {
      setSelectedStaff(prev => prev?.filter(id => id !== staffId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStaff(paginatedStaff?.map(s => s?.id));
    } else {
      setSelectedStaff([]);
    }
  };

  const handleAddStaff = () => {
    setStaffModal({ isOpen: true, staff: null, mode: 'add' });
  };

  const handleViewStaff = (staff) => {
    setStaffModal({ isOpen: true, staff, mode: 'view' });
  };

  const handleEditStaff = (staff) => {
    setStaffModal({ isOpen: true, staff, mode: 'edit' });
  };

  const handleDeleteStaff = (staff) => {
    setDeleteModal({ isOpen: true, staff });
  };

  const handleSaveStaff = async (formData) => {
    if (staffModal?.mode === 'add') {
      const newStaff = {
        ...formData,
        id: Date.now(),
        performance: {
          score: 85,
          completedTasks: 0,
          feedbackRating: 4.0
        }
      };
      setStaff(prev => [...prev, newStaff]);
    } else if (staffModal?.mode === 'edit') {
      setStaff(prev => prev?.map(s => s?.id === staffModal?.staff?.id ? { ...s, ...formData } : s));
    }
  };

  const handleConfirmDelete = async (staffId, reassignTo) => {
    setStaff(prev => prev?.filter(s => s?.id !== staffId));
    setSelectedStaff(prev => prev?.filter(id => id !== staffId));
  };

  const handleBulkStatusUpdate = (status) => {
    setStaff(prev => prev?.map(s => 
      selectedStaff?.includes(s?.id) ? { ...s, status } : s
    ));
    setSelectedStaff([]);
  };

  const handleBulkAssignment = (assignmentStatus) => {
    setStaff(prev => prev?.map(s => 
      selectedStaff?.includes(s?.id) ? { ...s, assignmentStatus } : s
    ));
    setSelectedStaff([]);
  };

  const handleBulkExport = () => {
    const selectedStaffData = staff?.filter(s => selectedStaff?.includes(s?.id));
    console.log('Exporting staff:', selectedStaffData);
    // Export functionality would go here
    setSelectedStaff([]);
  };

  const handleBulkDelete = () => {
    const staffToDelete = staff?.filter(s => selectedStaff?.includes(s?.id));
    // Show confirmation for bulk delete
    console.log('Bulk delete:', staffToDelete);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading staff management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={sidebarOpen} />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Staff Management</h1>
                <p className="text-muted-foreground">
                  Manage employee records, assignments, and performance tracking
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => console.log('Export all staff')}
                >
                  Ekspor Data
                </Button>
                <Button
                  onClick={handleAddStaff}
                  iconName="Plus"
                  iconPosition="left"
                >
                 Tambah Staff Baru
                </Button>
              </div>
            </div>

            {/* Stats */}
            <StaffStats staff={staff} />

            {/* Filters */}
            <StaffFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {paginatedStaff?.length} of {filteredAndSortedStaff?.length} staff members
              </p>
              {selectedStaff?.length > 0 && (
                <p className="text-sm text-primary font-medium">
                  {selectedStaff?.length} selected
                </p>
              )}
            </div>

            {/* Staff Table */}
            <StaffTable
              staff={paginatedStaff}
              selectedStaff={selectedStaff}
              onSelectStaff={handleSelectStaff}
              onSelectAll={handleSelectAll}
              onViewStaff={handleViewStaff}
              onEditStaff={handleEditStaff}
              onDeleteStaff={handleDeleteStaff}
              sortConfig={sortConfig}
              onSort={handleSort}
            />

            {/* Pagination */}
            {filteredAndSortedStaff?.length > itemsPerPage && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredAndSortedStaff?.length / itemsPerPage)}
                  totalItems={filteredAndSortedStaff?.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Modals */}
      <StaffModal
        isOpen={staffModal?.isOpen}
        onClose={() => setStaffModal({ isOpen: false, staff: null, mode: 'add' })}
        staff={staffModal?.staff}
        onSave={handleSaveStaff}
        mode={staffModal?.mode}
      />
      <DeleteConfirmModal
        isOpen={deleteModal?.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, staff: null })}
        staff={deleteModal?.staff}
        onConfirm={handleConfirmDelete}
        availableStaff={staff?.filter(s => s?.status === 'active' && s?.assignmentStatus === 'available')}
      />
      {/* Bulk Actions */}
      <BulkActionsBar
        selectedCount={selectedStaff?.length}
        onClearSelection={() => setSelectedStaff([])}
        onBulkStatusUpdate={handleBulkStatusUpdate}
        onBulkAssignment={handleBulkAssignment}
        onBulkExport={handleBulkExport}
        onBulkDelete={handleBulkDelete}
      />
    </div>
  );
};

export default StaffManagement;