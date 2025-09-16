import React, { useState, useEffect } from 'react';
import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import Pagination from '../../../components/ui/Pagination';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

// Import page components
import RequestFilters from './components/RequestFilters';
import RequestTable from './components/RequestTable';
import RequestModal from './components/RequestModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import SearchBar from './components/SearchBar';

const WastePickupRequests = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ column: 'requestId', direction: 'desc' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  
  // Modal states
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'create', // 'create', 'edit', 'view'
    request: null
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    request: null,
    isDeleting: false
  });

  // Mock data
  const mockRequests = [
    {
      id: 1,
      requestId: 'WR-2024-001',
      citizenName: 'John Smith',
      citizenPhone: '+1 (555) 123-4567',
      citizenEmail: 'john.smith@email.com',
      address: '123 Main Street, Apt 4B',
      district: 'downtown',
      wasteType: 'household',
      wasteIcon: 'Home',
      priority: 'medium',
      status: 'pending',
      scheduledDate: '2024-09-06',
      scheduledTime: '09:00',
      notes: 'Large furniture items need special handling',
      specialInstructions: 'Ring doorbell twice',
      estimatedWeight: '25',
      accessInstructions: 'Use back entrance',
      contactPreference: 'phone',
      requiresSpecialEquipment: true,
      isRecurring: false,
      recurringFrequency: '',
      createdAt: '2024-09-05T10:30:00Z'
    },
    {
      id: 2,
      requestId: 'WR-2024-002',
      citizenName: 'Sarah Johnson',
      citizenPhone: '+1 (555) 987-6543',
      citizenEmail: 'sarah.j@email.com',
      address: '456 Oak Avenue',
      district: 'northside',
      wasteType: 'recyclable',
      wasteIcon: 'Recycle',
      priority: 'high',
      status: 'scheduled',
      scheduledDate: '2024-09-06',
      scheduledTime: '14:30',
      notes: 'Electronics and batteries for recycling',
      specialInstructions: '',
      estimatedWeight: '15',
      accessInstructions: '',
      contactPreference: 'email',
      requiresSpecialEquipment: false,
      isRecurring: true,
      recurringFrequency: 'monthly',
      createdAt: '2024-09-04T14:15:00Z'
    },
    {
      id: 3,
      requestId: 'WR-2024-003',
      citizenName: 'Michael Rodriguez',
      citizenPhone: '+1 (555) 456-7890',
      citizenEmail: 'mrodriguez@email.com',
      address: '789 Pine Street',
      district: 'southside',
      wasteType: 'organic',
      wasteIcon: 'Leaf',
      priority: 'low',
      status: 'in-progress',
      scheduledDate: '2024-09-05',
      scheduledTime: '11:00',
      notes: 'Garden waste and compostable materials',
      specialInstructions: 'Items are in backyard',
      estimatedWeight: '40',
      accessInstructions: 'Gate code: 1234',
      contactPreference: 'sms',
      requiresSpecialEquipment: false,
      isRecurring: false,
      recurringFrequency: '',
      createdAt: '2024-09-03T09:45:00Z'
    },
    {
      id: 4,
      requestId: 'WR-2024-004',
      citizenName: 'Emily Chen',
      citizenPhone: '+1 (555) 321-0987',
      citizenEmail: 'emily.chen@email.com',
      address: '321 Elm Drive',
      district: 'eastside',
      wasteType: 'electronic',
      wasteIcon: 'Monitor',
      priority: 'urgent',
      status: 'completed',
      scheduledDate: '2024-09-04',
      scheduledTime: '16:00',
      notes: 'Old computer equipment and monitors',
      specialInstructions: 'Heavy items - need assistance',
      estimatedWeight: '60',
      accessInstructions: 'Apartment building - buzz #304',
      contactPreference: 'whatsapp',
      requiresSpecialEquipment: true,
      isRecurring: false,
      recurringFrequency: '',
      createdAt: '2024-09-02T16:20:00Z'
    },
    {
      id: 5,
      requestId: 'WR-2024-005',
      citizenName: 'David Wilson',
      citizenPhone: '+1 (555) 654-3210',
      citizenEmail: 'dwilson@email.com',
      address: '654 Maple Lane',
      district: 'westside',
      wasteType: 'hazardous',
      wasteIcon: 'AlertTriangle',
      priority: 'high',
      status: 'cancelled',
      scheduledDate: '2024-09-07',
      scheduledTime: '10:30',
      notes: 'Paint cans and chemical containers',
      specialInstructions: 'Hazmat certified crew required',
      estimatedWeight: '20',
      accessInstructions: 'Items in garage',
      contactPreference: 'phone',
      requiresSpecialEquipment: true,
      isRecurring: false,
      recurringFrequency: '',
      createdAt: '2024-09-01T11:10:00Z'
    },
    {
      id: 6,
      requestId: 'WR-2024-006',
      citizenName: 'Lisa Thompson',
      citizenPhone: '+1 (555) 789-0123',
      citizenEmail: 'lisa.t@email.com',
      address: '987 Cedar Court',
      district: 'suburbs',
      wasteType: 'bulk',
      wasteIcon: 'Package',
      priority: 'medium',
      status: 'pending',
      scheduledDate: '2024-09-08',
      scheduledTime: '13:00',
      notes: 'Old furniture and appliances',
      specialInstructions: 'Items on front porch',
      estimatedWeight: '100',
      accessInstructions: '',
      contactPreference: 'email',
      requiresSpecialEquipment: true,
      isRecurring: false,
      recurringFrequency: '',
      createdAt: '2024-09-05T08:30:00Z'
    }
  ];

  useEffect(() => {
    setRequests(mockRequests);
    setFilteredRequests(mockRequests);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...requests];

    // Apply search
    if (searchQuery) {
      filtered = filtered?.filter(request =>
        request?.requestId?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        request?.citizenName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        request?.address?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        request?.wasteType?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        request?.citizenPhone?.includes(searchQuery)
      );
    }

    // Apply filters
    if (filters?.status) {
      filtered = filtered?.filter(request => request?.status === filters?.status);
    }
    if (filters?.wasteType) {
      filtered = filtered?.filter(request => request?.wasteType === filters?.wasteType);
    }
    if (filters?.priority) {
      filtered = filtered?.filter(request => request?.priority === filters?.priority);
    }
    if (filters?.dateFrom) {
      filtered = filtered?.filter(request => request?.scheduledDate >= filters?.dateFrom);
    }
    if (filters?.dateTo) {
      filtered = filtered?.filter(request => request?.scheduledDate <= filters?.dateTo);
    }

    // Apply sorting
    if (sortConfig?.column) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.column];
        let bValue = b?.[sortConfig?.column];

        // Handle different data types
        if (sortConfig?.column === 'requestId') {
          aValue = parseInt(aValue?.split('-')?.[2]);
          bValue = parseInt(bValue?.split('-')?.[2]);
        } else if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredRequests(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [requests, searchQuery, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredRequests?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests?.slice(startIndex, startIndex + itemsPerPage);

  // Event handlers
  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSort = (config) => {
    setSortConfig(config);
  };

  const handleCreateRequest = () => {
    setModalState({
      isOpen: true,
      mode: 'create',
      request: null
    });
  };

  const handleViewRequest = (request) => {
    setModalState({
      isOpen: true,
      mode: 'view',
      request
    });
  };

  const handleEditRequest = (request) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      request
    });
  };

  const handleDeleteRequest = (request) => {
    setDeleteModal({
      isOpen: true,
      request,
      isDeleting: false
    });
  };

  const handleConfirmDelete = async (requestId) => {
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    
    // Simulate API call
    setTimeout(() => {
      setRequests(prev => prev?.filter(req => req?.id !== requestId));
      setDeleteModal({
        isOpen: false,
        request: null,
        isDeleting: false
      });
    }, 1000);
  };

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(prev => prev?.map(req => 
      req?.id === requestId ? { ...req, status: newStatus } : req
    ));
  };

  const handleModalSave = async (formData, mode) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (mode === 'create') {
      const newRequest = {
        ...formData,
        id: Date.now(),
        requestId: `WR-2024-${String(requests?.length + 1)?.padStart(3, '0')}`,
        wasteIcon: getWasteIcon(formData?.wasteType),
        status: 'pending',
        createdAt: new Date()?.toISOString()
      };
      setRequests(prev => [newRequest, ...prev]);
    } else if (mode === 'edit') {
      setRequests(prev => prev?.map(req => 
        req?.id === modalState?.request?.id 
          ? { ...req, ...formData, wasteIcon: getWasteIcon(formData?.wasteType) }
          : req
      ));
    }

    setModalState({
      isOpen: false,
      mode: 'create',
      request: null
    });
  };

  const getWasteIcon = (wasteType) => {
    const iconMap = {
      household: 'Home',
      recyclable: 'Recycle',
      organic: 'Leaf',
      electronic: 'Monitor',
      hazardous: 'AlertTriangle',
      bulk: 'Package'
    };
    return iconMap?.[wasteType] || 'Package';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={sidebarOpen} />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      <main className={`
        pt-16 transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      `}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Permintaan Penjemputan Sampah</h1>
              <p className="text-muted-foreground">
              Kelola permintaan layanan warga untuk pengumpulan dan pembuangan sampah
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Permintaan</p>
                  <p className="text-2xl font-bold text-foreground">{requests?.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={24} className="text-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tertunda</p>
                  <p className="text-2xl font-bold text-warning">
                    {requests?.filter(r => r?.status === 'pending')?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sedang Diproses</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {requests?.filter(r => r?.status === 'in-progress')?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="Truck" size={24} className="text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Selesai</p>
                  <p className="text-2xl font-bold text-success">
                    {requests?.filter(r => r?.status === 'completed')?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <RequestFilters 
            onFiltersChange={handleFiltersChange}
            totalResults={filteredRequests?.length}
          />

          {/* Requests Table */}
          <RequestTable
            requests={paginatedRequests}
            onView={handleViewRequest}
            onEdit={handleEditRequest}
            onDelete={handleDeleteRequest}
            onStatusChange={handleStatusChange}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredRequests?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </div>
          )}
        </div>
      </main>
      {/* Modals */}
      <RequestModal
        isOpen={modalState?.isOpen}
        onClose={() => setModalState({ isOpen: false, mode: 'create', request: null })}
        onSave={handleModalSave}
        request={modalState?.request}
        mode={modalState?.mode}
      />
      <DeleteConfirmModal
        isOpen={deleteModal?.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, request: null, isDeleting: false })}
        onConfirm={handleConfirmDelete}
        request={deleteModal?.request}
        isDeleting={deleteModal?.isDeleting}
      />
    </div>
  );
};

export default WastePickupRequests;