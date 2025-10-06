import React, { useState, useEffect } from 'react';
import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import Pagination from '../../../components/ui/Pagination';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

// Komponen halaman
import RequestFilters from './components/RequestFilters';
import RequestTable from './components/RequestTable';
import RequestModal from './components/RequestModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

// 🔥 Supabase
import { supabase } from '../../../lib/supabase';

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
  
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'create', request: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, request: null, isDeleting: false });

  // 🔥 FETCH DARI SUPABASE — SESUAI DB ANDA
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('pickup_request')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Format sesuai DB Anda: hanya ada name, address, pickup_date, dll
        const formatted = data.map((req, idx) => {
          // Konversi pickup_time ke jam (hardcode)
          const timeMap = { morning: '09:00', afternoon: '14:00', evening: '17:00' };
          const scheduledTime = timeMap[req.pickup_time] || '09:00';

          return {
            id: req.id,
            requestId: `WR-${new Date(req.created_at).getFullYear()}-${String(data.length - idx).padStart(3, '0')}`,
            citizenName: req.name || 'Anonim',
            citizenPhone: '-', // hardcode karena tidak ada di DB
            citizenEmail: '-', // hardcode
            address: req.address,
            district: 'Gresik',
            wasteType: req.waste_type,
            wasteIcon: getWasteIcon(req.waste_type),
            priority: 'medium',
            status: 'scheduled', // 🔥 hardcode status (karena tidak ada di DB)
            scheduledDate: req.pickup_date,
            scheduledTime: scheduledTime,
            notes: req.intruksi || '-',
            specialInstructions: req.intruksi || '',
            estimatedWeight: '-',
            accessInstructions: req.intruksi || '',
            contactPreference: 'phone', // hardcode
            requiresSpecialEquipment: false,
            isRecurring: false,
            recurringFrequency: '',
            createdAt: req.created_at
          };
        });

        setRequests(formatted);
        setFilteredRequests(formatted);
      } catch (err) {
        console.error('Gagal memuat data:', err);
        alert('Gagal memuat permintaan. Cek koneksi atau izin akses.');
      }
    };

    fetchRequests();
  }, []);

  // 🔥 SISA LOGIKA FILTER, PAGINATION, DLL TETAP SAMA — TIDAK DIUBAH
  useEffect(() => {
    let filtered = [...requests];

    if (searchQuery) {
      filtered = filtered.filter(req =>
        req.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.wasteType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(req => req.status === filters.status);
    }
    if (filters.wasteType) {
      filtered = filtered.filter(req => req.wasteType === filters.wasteType);
    }
    if (filters.priority) {
      filtered = filtered.filter(req => req.priority === filters.priority);
    }
    if (filters.dateFrom) {
      filtered = filtered.filter(req => req.scheduledDate >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(req => req.scheduledDate <= filters.dateTo);
    }

    if (sortConfig.column) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.column];
        let bValue = b[sortConfig.column];

        if (sortConfig.column === 'requestId') {
          aValue = parseInt(aValue.split('-')[2]);
          bValue = parseInt(bValue.split('-')[2]);
        } else if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredRequests(filtered);
    setCurrentPage(1);
  }, [requests, searchQuery, filters, sortConfig]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  // Handlers (tetap pakai state lokal — tidak akses Supabase untuk edit/hapus dulu)
  const handleMenuToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSearch = (q) => setSearchQuery(q);
  const handleFiltersChange = (f) => setFilters(f);
  const handleSort = (config) => setSortConfig(config);
  const handleCreateRequest = () => setModalState({ isOpen: true, mode: 'create', request: null });
  const handleViewRequest = (req) => setModalState({ isOpen: true, mode: 'view', request: req });
  const handleEditRequest = (req) => setModalState({ isOpen: true, mode: 'edit', request: req });
  const handleDeleteRequest = (req) => setDeleteModal({ isOpen: true, request: req, isDeleting: false });

  const handleConfirmDelete = async (id) => {
    setDeleteModal(p => ({ ...p, isDeleting: true }));
    setTimeout(() => {
      setRequests(r => r.filter(req => req.id !== id));
      setDeleteModal({ isOpen: false, request: null, isDeleting: false });
    }, 500);
  };

  const handleStatusChange = (id, newStatus) => {
    setRequests(r => r.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  const handleModalSave = async (formData, mode) => {
    await new Promise(r => setTimeout(r, 500));
    if (mode === 'create') {
      const newReq = {
        ...formData,
        id: Date.now(),
        requestId: `WR-2025-${String(requests.length + 1).padStart(3, '0')}`,
        wasteIcon: getWasteIcon(formData.wasteType),
        status: 'scheduled',
        createdAt: new Date().toISOString()
      };
      setRequests(prev => [newReq, ...prev]);
    } else if (mode === 'edit') {
      setRequests(prev => prev.map(req =>
        req.id === modalState.request.id ? { ...req, ...formData, wasteIcon: getWasteIcon(formData.wasteType) } : req
      ));
    }
    setModalState({ isOpen: false, mode: 'create', request: null });
  };

  const getWasteIcon = (type) => {
    const map = { household: 'Home', recyclable: 'Recycle', organic: 'Leaf', electronic: 'Monitor', hazardous: 'AlertTriangle', bulk: 'Package' };
    return map[type] || 'Package';
  };

  // 🔥 SISA JSX TETAP SAMA — TIDAK DIUBAH
  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={sidebarOpen} />
      <Sidebar isCollapsed={sidebarCollapsed} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className={`pt-16 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6">
          <Breadcrumb />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Permintaan Penjemputan Sampah</h1>
              <p className="text-muted-foreground">Kelola permintaan layanan warga untuk pengumpulan dan pembuangan sampah</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Permintaan" value={requests.length} icon="FileText" color="primary" />
            <StatCard title="Tertunda" value={requests.filter(r => r.status === 'scheduled').length} icon="Clock" color="warning" />
            <StatCard title="Sedang Diproses" value={requests.filter(r => r.status === 'in-progress').length} icon="Truck" color="blue-600" />
            <StatCard title="Selesai" value={requests.filter(r => r.status === 'completed').length} icon="CheckCircle" color="success" />
          </div>

          <RequestFilters onFiltersChange={handleFiltersChange} totalResults={filteredRequests.length} />
          <RequestTable
            requests={paginatedRequests}
            onView={handleViewRequest}
            onEdit={handleEditRequest}
            onDelete={handleDeleteRequest}
            onStatusChange={handleStatusChange}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredRequests.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </div>
          )}
        </div>
      </main>

      <RequestModal isOpen={modalState.isOpen} onClose={() => setModalState({ isOpen: false, mode: 'create', request: null })} onSave={handleModalSave} request={modalState.request} mode={modalState.mode} />
      <DeleteConfirmModal isOpen={deleteModal.isOpen} onClose={() => setDeleteModal({ isOpen: false, request: null, isDeleting: false })} onConfirm={handleConfirmDelete} request={deleteModal.request} isDeleting={deleteModal.isDeleting} />
    </div>
  );
};

// Komponen helper untuk stats card (opsional, bisa dipindah ke file terpisah)
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-card border border-border rounded-lg p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
      <div className={`w-12 h-12 bg-${color}/10 rounded-lg flex items-center justify-center`}>
        <Icon name={icon} size={24} className={`text-${color}`} />
      </div>
    </div>
  </div>
);

export default WastePickupRequests;