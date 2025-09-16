import React, { useState, useEffect } from 'react';
import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import MetricsCard from '././components/MetricsCard';
import ChartContainer from '././components/ChartContainer';
import FilterPanel from '././components/FilterPanel';
import ReportGenerator from '././components/ReportGenerator';
import DataTable from '././components/DataTable';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsAndReports = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for metrics cards
  const metricsData = [
    {
      title: "Total Permintaan",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive",
      icon: "Truck",
      description: "This month",
      trend: [45, 52, 48, 61, 55, 67, 73]
    },
    {
      title: "Tingkat Penyelesaian",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: "CheckCircle",
      description: "Average efficiency",
      trend: [78, 82, 85, 88, 91, 93, 94]
    },
    {
      title: "Biaya per Pengambilan",
      value: "$24.50",
      change: "-5.3%",
      changeType: "positive",
      icon: "DollarSign",
      description: "Per pickup",
      trend: [28, 27, 26, 25, 24, 24, 25]
    },
    {
      title: "Dampak Lingkungan",
      value: "1,245 tons",
      change: "+8.7%",
      changeType: "positive",
      icon: "Leaf",
      description: "CO2 saved",
      trend: [35, 42, 38, 45, 48, 52, 55]
    },
    {
      title: "Kepuasan Warga",
      value: "4.6/5.0",
      change: "+0.2",
      changeType: "positive",
      icon: "Star",
      description: "Average rating",
      trend: [42, 44, 43, 45, 46, 46, 46]
    },
    {
      title: "Waktu Respon",
      value: "2.4 hours",
      change: "-18 min",
      changeType: "positive",
      icon: "Clock",
      description: "Average response",
      trend: [180, 165, 155, 148, 142, 138, 144]
    }
  ];

  // Mock data for charts
  const requestTrendsData = [
    { name: 'Jan', requests: 2100, completed: 1980, pending: 120 },
    { name: 'Feb', requests: 2300, completed: 2150, pending: 150 },
    { name: 'Mar', requests: 2500, completed: 2350, pending: 150 },
    { name: 'Apr', requests: 2200, completed: 2080, pending: 120 },
    { name: 'May', requests: 2600, completed: 2450, pending: 150 },
    { name: 'Jun', requests: 2800, completed: 2640, pending: 160 },
    { name: 'Jul', requests: 2900, completed: 2730, pending: 170 },
    { name: 'Aug', requests: 2847, completed: 2682, pending: 165 }
  ];

  const wasteCategoryData = [
    { name: 'Residential', value: 1245, color: '#2D5A3D' },
    { name: 'Commercial', value: 856, color: '#4A7C59' },
    { name: 'Industrial', value: 432, color: '#7BA05B' },
    { name: 'Recycling', value: 314, color: '#059669' }
  ];

  const departmentPerformanceData = [
    { name: 'Collection', efficiency: 94, satisfaction: 4.6, cost: 24.50 },
    { name: 'Recycling', efficiency: 89, satisfaction: 4.4, cost: 18.20 },
    { name: 'Hazardous', efficiency: 96, satisfaction: 4.8, cost: 45.30 },
    { name: 'Maintenance', efficiency: 87, satisfaction: 4.2, cost: 32.10 }
  ];

  // Mock data for data table
  const performanceTableData = [
    {
      route: 'Route A-1',
      driver: 'John Smith',
      requests: 45,
      completed: 43,
      efficiency: '95.6%',
      avgTime: '2.1 hrs',
      satisfaction: '4.7',
      cost: '$1,102.50'
    },
    {
      route: 'Route B-2',
      driver: 'Maria Garcia',
      requests: 38,
      completed: 36,
      efficiency: '94.7%',
      avgTime: '2.3 hrs',
      satisfaction: '4.5',
      cost: '$931.00'
    },
    {
      route: 'Route C-3',
      driver: 'David Johnson',
      requests: 52,
      completed: 48,
      efficiency: '92.3%',
      avgTime: '2.8 hrs',
      satisfaction: '4.3',
      cost: '$1,274.00'
    },
    {
      route: 'Route D-4',
      driver: 'Sarah Wilson',
      requests: 41,
      completed: 40,
      efficiency: '97.6%',
      avgTime: '1.9 hrs',
      satisfaction: '4.8',
      cost: '$1,025.50'
    },
    {
      route: 'Route E-5',
      driver: 'Michael Brown',
      requests: 47,
      completed: 44,
      efficiency: '93.6%',
      avgTime: '2.4 hrs',
      satisfaction: '4.4',
      cost: '$1,152.50'
    }
  ];

  const tableColumns = [
    { key: 'route', label: 'Route', sortable: true },
    { key: 'driver', label: 'Driver', sortable: true },
    { key: 'requests', label: 'Requests', sortable: true },
    { key: 'completed', label: 'Completed', sortable: true },
    { 
      key: 'efficiency', 
      label: 'Efficiency', 
      sortable: true,
      render: (value) => (
        <span className={`font-medium ${parseFloat(value) >= 95 ? 'text-success' : parseFloat(value) >= 90 ? 'text-warning' : 'text-error'}`}>
          {value}
        </span>
      )
    },
    { key: 'avgTime', label: 'Avg Time', sortable: true },
    { 
      key: 'satisfaction', 
      label: 'Rating', 
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Icon name="Star" size={14} className="text-warning fill-current" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    { key: 'cost', label: 'Cost', sortable: true }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'reports', label: 'Reports', icon: 'FileText' }
  ];

  const handleFiltersChange = (filters) => {
    setIsLoading(true);
    console.log('Filters changed:', filters);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    console.log('Refreshing data...');
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleExportChart = (chartTitle) => {
    console.log('Exporting chart:', chartTitle);
    // Simulate export
  };

  const handleExportTable = () => {
    console.log('Exporting performance data...');
    // Simulate export
  };

  const handleGenerateReport = (config) => {
    setIsGeneratingReport(true);
    console.log('Generating report with config:', config);
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      console.log('Report generated successfully');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isMenuOpen={sidebarOpen}
      />
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Analytics & Reports</h1>
              <p className="text-muted-foreground">
              Visualisasi data menyeluruh dan wawasan kinerja untuk operasional pengelolaan sampah kota
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                iconName="Settings"
                iconSize={16}
                onClick={() => console.log('Open settings')}
              >
                Configure
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconSize={16}
                onClick={() => console.log('Create custom report')}
              >
                Custom Report
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          <FilterPanel
            onFiltersChange={handleFiltersChange}
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 mb-6 border-b border-border">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-micro ${
                  activeTab === tab?.id
                    ? 'bg-card text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                {tab?.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metricsData?.map((metric, index) => (
                  <MetricsCard key={index} {...metric} />
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartContainer
                  title="Request Trends"
                  type="line"
                  data={requestTrendsData}
                  config={{
                    lines: [
                      { dataKey: 'requests', name: 'Total Requests' },
                      { dataKey: 'completed', name: 'Completed' },
                      { dataKey: 'pending', name: 'Pending' }
                    ]
                  }}
                  onExport={() => handleExportChart('Request Trends')}
                />

                <ChartContainer
                  title="Waste Categories"
                  type="pie"
                  data={wasteCategoryData}
                  config={{}}
                  onExport={() => handleExportChart('Waste Categories')}
                />

                <ChartContainer
                  title="Department Performance"
                  type="bar"
                  data={departmentPerformanceData}
                  config={{
                    bars: [
                      { dataKey: 'efficiency', name: 'Efficiency %' },
                      { dataKey: 'satisfaction', name: 'Satisfaction' }
                    ]
                  }}
                  onExport={() => handleExportChart('Department Performance')}
                  className="lg:col-span-2"
                />
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <DataTable
                title="Route Performance Analysis"
                data={performanceTableData}
                columns={tableColumns}
                onExport={handleExportTable}
              />
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <ReportGenerator
                onGenerateReport={handleGenerateReport}
                isGenerating={isGeneratingReport}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnalyticsAndReports;