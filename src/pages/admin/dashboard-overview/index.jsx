import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/ui/Header";
import Sidebar from '../../../components/ui/Sidebar';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import StatsCard from './components/StatsCard';
import ServiceScheduleCard from './components/ServiceScheduleCard';
import RequestTrendsChart from './components/RequestTrendsChart';
import WasteCategoryChart from './components/WasteCategoryChart';
import RecentActivitiesTable from './components/RecentActivitiesTable';
import QuickActions from './components/QuickActions';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Mock data for statistics cards
  const statsData = [
    {
      title: "Total Permintaan",
      value: "1,247",
      change: "+12.5%",
      changeType: "increase",
      icon: "FileText",
      color: "primary"
    },
    {
      title: "Penjemputan Selesai",
      value: "1,089",
      change: "+8.3%",
      changeType: "increase",
      icon: "CheckCircle",
      color: "success"
    },
    {
      title: "Laporan Tertunda",
      value: "158",
      change: "-5.2%",
      changeType: "decrease",
      icon: "Clock",
      color: "warning"
    },
    {
      title: "Staf Aktif",
      value: "42",
      change: "+2",
      changeType: "increase",
      icon: "Users",
      color: "primary"
    }
  ];

  // Mock data for today's schedule
  const todayRoutes = [
    {
      id: 1,
      name: "Route A-1",
      area: "Downtown District",
      time: "08:00 AM",
      staff: "Team Alpha",
      status: "completed"
    },
    {
      id: 2,
      name: "Route B-2",
      area: "Residential North",
      time: "10:30 AM",
      staff: "Team Beta",
      status: "in-progress"
    },
    {
      id: 3,
      name: "Route C-3",
      area: "Industrial Zone",
      time: "02:00 PM",
      staff: "Team Gamma",
      status: "pending"
    }
  ];

  // Mock data for tomorrow's schedule
  const tomorrowRoutes = [
    {
      id: 4,
      name: "Route D-1",
      area: "Suburban East",
      time: "07:30 AM",
      staff: "Team Delta",
      status: "pending"
    },
    {
      id: 5,
      name: "Route E-2",
      area: "Commercial West",
      time: "09:00 AM",
      staff: "Team Echo",
      status: "pending"
    },
    {
      id: 6,
      name: "Route F-3",
      area: "Mixed Use South",
      time: "01:30 PM",
      staff: "Team Foxtrot",
      status: "pending"
    }
  ];

  // Mock data for request trends chart
  const trendsData = [
    { date: "Mon", requests: 45, completed: 42 },
    { date: "Tue", requests: 52, completed: 48 },
    { date: "Wed", requests: 38, completed: 35 },
    { date: "Thu", requests: 61, completed: 58 },
    { date: "Fri", requests: 55, completed: 52 },
    { date: "Sat", requests: 28, completed: 25 },
    { date: "Sun", requests: 22, completed: 20 }
  ];

  // Mock data for waste categories
  const wasteCategories = [
    { name: "Household", value: 485, total: 1247 },
    { name: "Recyclable", value: 312, total: 1247 },
    { name: "Organic", value: 198, total: 1247 },
    { name: "Hazardous", value: 156, total: 1247 },
    { name: "Electronic", value: 96, total: 1247 }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "pickup",
      title: "Penjemputan Selesai - Rute A-1",
      description: "Berhasil mengumpulkan 2,3 ton sampah rumah tangga dari Distrik Pusat Kota",
      location: "Downtown District",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: "completed"
    },
    {
      id: 2,
      type: "report",
      title: "Laporan Mingguan Dibuat",
      description: "Ringkasan pengumpulan sampah untuk minggu yang berakhir 1 September 2025",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: "completed"
    },
    {
      id: 3,
      type: "staff",
      title: "Penugasan Staf Diperbarui",
      description: "Tim Beta dipindahkan ke Rute B-2 untuk meningkatkan efisiensi",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "completed"
    },
    {
      id: 4,
      type: "pickup",
      title: "Permintaan Penjemputan Baru",
      description: "Permintaan darurat untuk penjemputan di Kawasan Industri karena tumpahan sampah",
      location: "Industrial Zone",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: "pending"
    },
    {
      id: 5,
      type: "system",
      title: "Pemeliharaan Sistem",
      description: "Optimasi basis data terjadwal berhasil diselesaikan",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: "completed"
    }
  ];

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleViewAllSchedule = () => {
    navigate('/service-schedule');
  };

  const handleViewAllActivities = () => {
    navigate('/analytics-and-reports');
  };

  // Auto-close sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isSidebarOpen} />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        isOpen={isSidebarOpen} 
        onClose={handleSidebarClose} 
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Ringkasan Dashboard</h1>
            <p className="text-muted-foreground">
            Wawasan operasional dan metrik pengelolaan sampah untuk layanan kota
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData?.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat?.title}
                value={stat?.value}
                change={stat?.change}
                changeType={stat?.changeType}
                icon={stat?.icon}
                color={stat?.color}
              />
            ))}
          </div>

          {/* Service Schedule Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ServiceScheduleCard
              title="Jadwal Hari Ini"
              date="September 5, 2025"
              routes={todayRoutes}
              onViewAll={handleViewAllSchedule}
            />
            <ServiceScheduleCard
              title="Jadwal Besok"
              date="September 6, 2025"
              routes={tomorrowRoutes}
              onViewAll={handleViewAllSchedule}
            />
          </div>

          {/* Analytics Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RequestTrendsChart data={trendsData} />
            <WasteCategoryChart data={wasteCategories} />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Recent Activities */}
          <div className="mb-8">
            <RecentActivitiesTable 
              activities={recentActivities}
              onViewAll={handleViewAllActivities}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;