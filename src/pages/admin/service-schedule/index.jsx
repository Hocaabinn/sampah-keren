import React, { useState, useEffect } from 'react';
import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import CalendarView from '././components/CalendarView';
import ScheduleDetailsPanel from '././components/ScheduleDetailsPanel';
import ScheduleFilters from '././components/ScheduleFilters';
import CreateScheduleModal from '././components/CreateScheduleModal';
import BulkScheduleModal from '././components/BulkScheduleModal';

const ServiceSchedule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    wasteType: '',
    staff: '',
    priority: '',
    startDate: '',
    endDate: '',
    vehicle: '',
    timeRange: ''
  });

  // Mock data for schedules
  const [schedules, setSchedules] = useState([
    {
      id: '1',
      route: 'Downtown District A',
      date: new Date(2025, 8, 5),
      time: '08:00',
      duration: '3 hours',
      staff: 'staff-1',
      vehicle: 'vehicle-1',
      wasteType: 'general',
      priority: 'high',
      status: 'pending',
      locations: '25',
      estimatedDistance: '12 km',
      notes: 'Heavy traffic expected in morning hours',
      progress: 0
    },
    {
      id: '2',
      route: 'Residential Zone B',
      date: new Date(2025, 8, 5),
      time: '10:30',
      duration: '2.5 hours',
      staff: 'staff-2',
      vehicle: 'vehicle-2',
      wasteType: 'recyclable',
      priority: 'medium',
      status: 'in-progress',
      locations: '18',
      estimatedDistance: '8 km',
      notes: 'Focus on recycling bins collection',
      progress: 65
    },
    {
      id: '3',
      route: 'Industrial Park C',
      date: new Date(2025, 8, 6),
      time: '07:00',
      duration: '4 hours',
      staff: 'staff-3',
      vehicle: 'vehicle-3',
      wasteType: 'hazardous',
      priority: 'high',
      status: 'pending',
      locations: '12',
      estimatedDistance: '15 km',
      notes: 'Special handling required for hazardous materials',
      progress: 0
    },
    {
      id: '4',
      route: 'Suburban Area D',
      date: new Date(2025, 8, 6),
      time: '09:15',
      duration: '2 hours',
      staff: 'staff-1',
      vehicle: 'vehicle-1',
      wasteType: 'organic',
      priority: 'low',
      status: 'completed',
      locations: '30',
      estimatedDistance: '10 km',
      notes: 'Organic waste collection completed successfully',
      progress: 100
    },
    {
      id: '5',
      route: 'Commercial Strip E',
      date: new Date(2025, 8, 7),
      time: '11:00',
      duration: '1.5 hours',
      staff: 'staff-2',
      vehicle: 'vehicle-2',
      wasteType: 'general',
      priority: 'medium',
      status: 'pending',
      locations: '8',
      estimatedDistance: '5 km',
      notes: 'Small commercial area with limited access',
      progress: 0
    }
  ]);

  // Mock staff members
  const staffMembers = [
    { id: 'staff-1', name: 'John Martinez', role: 'Senior Collector', status: 'available' },
    { id: 'staff-2', name: 'Sarah Johnson', role: 'Route Supervisor', status: 'on-route' },
    { id: 'staff-3', name: 'Mike Chen', role: 'Hazmat Specialist', status: 'available' },
    { id: 'staff-4', name: 'Lisa Rodriguez', role: 'Driver', status: 'available' },
    { id: 'staff-5', name: 'David Thompson', role: 'Collector', status: 'off-duty' }
  ];

  // Mock vehicles
  const vehicles = [
    { id: 'vehicle-1', type: 'Garbage Truck', plateNumber: 'GT-001', capacity: '15 tons', status: 'available' },
    { id: 'vehicle-2', type: 'Recycling Truck', plateNumber: 'RT-002', capacity: '12 tons', status: 'in-use' },
    { id: 'vehicle-3', type: 'Hazmat Vehicle', plateNumber: 'HV-003', capacity: '8 tons', status: 'available' },
    { id: 'vehicle-4', type: 'Compact Truck', plateNumber: 'CT-004', capacity: '6 tons', status: 'maintenance' }
  ];

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleScheduleClick = (schedule) => {
    console.log('Schedule clicked:', schedule);
    // Could open a detailed view or edit modal
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleDateChange = (date) => {
    setCurrentDate(date);
    setSelectedDate(date);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      wasteType: '',
      staff: '',
      priority: '',
      startDate: '',
      endDate: '',
      vehicle: '',
      timeRange: ''
    });
  };

  const handleCreateSchedule = (date = null) => {
    setEditingSchedule(null);
    if (date) {
      setSelectedDate(date);
    }
    setIsCreateModalOpen(true);
  };

  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setIsCreateModalOpen(true);
  };

  const handleDeleteSchedule = (schedule) => {
    if (window.confirm(`Are you sure you want to delete the schedule for "${schedule?.route}"?`)) {
      setSchedules(prev => prev?.filter(s => s?.id !== schedule?.id));
    }
  };

  const handleSaveSchedule = async (scheduleData) => {
    if (editingSchedule) {
      // Update existing schedule
      setSchedules(prev => prev?.map(s => 
        s?.id === editingSchedule?.id ? { ...scheduleData, date: new Date(scheduleData.date) } : s
      ));
    } else {
      // Create new schedule
      setSchedules(prev => [...prev, { 
        ...scheduleData, 
        date: new Date(scheduleData.date),
        id: Date.now()?.toString()
      }]);
    }
  };

  const handleBulkSave = async (bulkSchedules) => {
    const newSchedules = bulkSchedules?.map(schedule => ({
      ...schedule,
      id: Date.now()?.toString() + Math.random()?.toString(36)?.substr(2, 9)
    }));
    setSchedules(prev => [...prev, ...newSchedules]);
  };

  // Filter schedules based on current filters
  const filteredSchedules = schedules?.filter(schedule => {
    const matchesSearch = !filters?.search || 
      schedule?.route?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      schedule?.notes?.toLowerCase()?.includes(filters?.search?.toLowerCase());
    
    const matchesStatus = !filters?.status || schedule?.status === filters?.status;
    const matchesWasteType = !filters?.wasteType || schedule?.wasteType === filters?.wasteType;
    const matchesStaff = !filters?.staff || schedule?.staff === filters?.staff;
    const matchesPriority = !filters?.priority || schedule?.priority === filters?.priority;
    const matchesVehicle = !filters?.vehicle || schedule?.vehicle === filters?.vehicle;

    const scheduleDate = new Date(schedule.date);
    const matchesStartDate = !filters?.startDate || scheduleDate >= new Date(filters.startDate);
    const matchesEndDate = !filters?.endDate || scheduleDate <= new Date(filters.endDate);

    let matchesTimeRange = true;
    if (filters?.timeRange) {
      const hour = parseInt(schedule?.time?.split(':')?.[0]);
      switch (filters?.timeRange) {
        case 'morning':
          matchesTimeRange = hour >= 6 && hour < 12;
          break;
        case 'afternoon':
          matchesTimeRange = hour >= 12 && hour < 18;
          break;
        case 'evening':
          matchesTimeRange = hour >= 18 && hour < 22;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesWasteType && matchesStaff && 
           matchesPriority && matchesVehicle && matchesStartDate && matchesEndDate && matchesTimeRange;
  });

  // Get schedules for selected date
  const selectedDateSchedules = filteredSchedules?.filter(schedule => 
    new Date(schedule.date)?.toDateString() === selectedDate?.toDateString()
  );

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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Jadwal Layanan</h1>
              <p className="text-muted-foreground">
              Rencanakan dan kelola rute pengumpulan sampah dengan penjadwalan berbasis kalender
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setIsBulkModalOpen(true)}
                iconName="CalendarDays"
                iconPosition="left"
                iconSize={16}
              >
                Jadwal Massal
              </Button>
              <Button
                variant="default"
                onClick={() => handleCreateSchedule()}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
               Buat Jadwal
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <ScheduleFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              staffMembers={staffMembers}
              vehicles={vehicles}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Calendar View */}
            <div className="xl:col-span-2">
              <CalendarView
                currentDate={currentDate}
                viewMode={viewMode}
                schedules={filteredSchedules}
                onDateSelect={handleDateSelect}
                onScheduleClick={handleScheduleClick}
                onViewModeChange={handleViewModeChange}
                onDateChange={handleDateChange}
              />
            </div>

            {/* Schedule Details Panel */}
            <div className="xl:col-span-1">
              <ScheduleDetailsPanel
                selectedDate={selectedDate}
                schedules={selectedDateSchedules}
                onScheduleEdit={handleEditSchedule}
                onScheduleDelete={handleDeleteSchedule}
                onCreateSchedule={handleCreateSchedule}
              />
            </div>
          </div>

          {/* Mobile Schedule List (shown below calendar on mobile) */}
          <div className="xl:hidden mt-6">
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Today's Schedule
              </h3>
              {selectedDateSchedules?.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No schedules for this date</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDateSchedules?.map(schedule => (
                    <div key={schedule?.id} className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{schedule?.route}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          schedule?.status === 'completed' ? 'bg-success/10 text-success' :
                          schedule?.status === 'in-progress' ? 'bg-warning/10 text-warning' :
                          schedule?.status === 'pending' ? 'bg-muted/10 text-muted-foreground' :
                          'bg-error/10 text-error'
                        }`}>
                          {schedule?.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {schedule?.time} • {schedule?.duration} • {schedule?.locations} locations
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <CreateScheduleModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingSchedule(null);
        }}
        onSave={handleSaveSchedule}
        selectedDate={selectedDate}
        staffMembers={staffMembers}
        vehicles={vehicles}
        existingSchedules={schedules}
        editingSchedule={editingSchedule}
      />
      <BulkScheduleModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onSave={handleBulkSave}
        staffMembers={staffMembers}
        vehicles={vehicles}
      />
    </div>
  );
};

export default ServiceSchedule;