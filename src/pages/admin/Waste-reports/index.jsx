import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

// Import components
import ReportFilters from './components/ReportFilters';
import ReportSummaryCards from './components/ReportSummaryCards';
import ReportModal from './components/ReportModal';
import ReportTable from './components/ReportTable';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import ExportModal from './components/ExportModal';

const WasteReports = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filters, setFilters] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  // Ambil data laporan dari Supabase


  // Hitung summary data
  const summaryData = {
    totalWaste: reports?.reduce(
      (sum, report) =>
        sum +
        Object.values(report?.wasteCategories || {}).reduce(
          (catSum, cat) => catSum + (cat?.collected || 0),
          0
        ),
      0
    ),
    recyclingRate:
      reports?.length > 0
        ? (
            (reports.reduce(
              (sum, report) => sum + (report?.wasteCategories?.recyclable?.collected || 0),
              0
            ) /
              reports.reduce(
                (sum, report) =>
                  sum +
                  Object.values(report?.wasteCategories || {}).reduce(
                    (catSum, cat) => catSum + (cat?.collected || 0),
                    0
                  ),
                0
              )) *
            100
          ).toFixed(1)
        : 0,
    routeEfficiency: 87.3,
    reportsCompleted: reports?.filter((r) => r?.completionStatus === 'completed')?.length,
  };

  // Filter data berdasarkan search & filter
  useEffect(() => {
    let filtered = [...reports];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (report) =>
          report?.reportId?.toLowerCase()?.includes(query) ||
          report?.route?.toLowerCase()?.includes(query) ||
          report?.staffAssignment?.toLowerCase()?.includes(query) ||
          report?.vehicleInfo?.driverName?.toLowerCase()?.includes(query) ||
          report?.notes?.toLowerCase()?.includes(query)
      );
    }

    if (filters?.dateFrom) {
      filtered = filtered.filter((r) => r?.collectionDate >= filters?.dateFrom);
    }
    if (filters?.dateTo) {
      filtered = filtered.filter((r) => r?.collectionDate <= filters?.dateTo);
    }
    if (filters?.route) {
      filtered = filtered.filter((r) => r?.route === filters?.route);
    }
    if (filters?.staffAssignment) {
      filtered = filtered.filter((r) => r?.staffAssignment === filters?.staffAssignment);
    }
    if (filters?.status) {
      filtered = filtered.filter((r) => r?.completionStatus === filters?.status);
    }
    if (filters?.wasteTypes?.length > 0) {
      filtered = filtered.filter((r) =>
        filters.wasteTypes.some((type) => r?.wasteCategories?.[type]?.collected > 0)
      );
    }

    setFilteredReports(filtered);
  }, [reports, searchQuery, filters]);

  const handleNewReport = () => {
    setSelectedReport(null);
    setIsReportModalOpen(true);
  };

  const handleSaveReport = async (reportData) => {
    try {
      const newReport = {
        reportId: `GRSK-${Date.now()}`,
        collectionDate: reportData.tanggal || new Date().toISOString(), // buat tanggal
        route: reportData.lokasi || "Lokasi tidak ada", // map ke 'route'
        wasteCategories: reportData.wasteCategories || { general: { collected: 0 } }, 
        staffAssignment: reportData.petugas || "Belum ditugaskan",
        completionStatus: "pending", // konsisten sama table
        notes: reportData.catatan || "",
      };
  
      const existingReports = JSON.parse(localStorage.getItem("userWasteReports")) || [];
      const updatedReports = [newReport, ...existingReports];
      localStorage.setItem("userWasteReports", JSON.stringify(updatedReports));
  
      setReports(updatedReports);
      setIsReportModalOpen(false);
      setSelectedReport(null);
    } catch (err) {
      console.error("Error saving report:", err);
    }
  };
  
  

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setReports((prev) => prev.filter((r) => r?.reportId !== selectedReport?.reportId));
      setIsDeleteModalOpen(false);
      setSelectedReport(null);
    } catch (err) {
      console.error('Error deleting report:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Waste Reports - EcoWaste Dashboard</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMenuOpen={isMobileMenuOpen} />
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className={`pt-16 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <Breadcrumb />
                <h1 className="text-2xl font-bold text-foreground">Laporan Sampah</h1>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setIsExportModalOpen(true)} iconName="Download">
                  Ekspor Laporan
                </Button>
                <Button onClick={handleNewReport} iconName="Plus">
                  Buat Laporan Baru
                </Button>
              </div>
            </div>

            <ReportSummaryCards summaryData={summaryData} />

            <div className="bg-card border border-border rounded-lg p-4">
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-4">
                <Input
                  type="search"
                  placeholder="Cari laporan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="outline" iconName="Search">
                  Cari
                </Button>
              </form>
            </div>

            <ReportFilters onFiltersChange={setFilters} activeFilters={filters} resultCount={filteredReports.length} />
            <ReportTable
              reports={filteredReports}
              onEdit={setSelectedReport}
              onDelete={(r) => {
                setSelectedReport(r);
                setIsDeleteModalOpen(true);
              }}
              onView={setSelectedReport}
            />
          </div>
        </main>

        <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} report={selectedReport} onSave={handleSaveReport} />
        <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} report={selectedReport} isDeleting={isDeleting} />
        <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} onExport={() => {}} />
      </div>
    </>
  );
};

export default WasteReports;
