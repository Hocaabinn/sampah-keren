import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, isOpen = false, onClose }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Ringkasan Dasbor',
      path: '/dashboard-overview',
      icon: 'LayoutDashboard',
      description: 'Operational command center'
    },
    {
      id: 'requests',
      label: 'Permintaan Penjemputan Sampah',
      path: '/waste-pickup-requests',
      icon: 'Truck',
      description: 'Service request management'
    },
    {
      id: 'schedule',
      label: 'Jadwal Layanan',
      path: '/service-schedule',
      icon: 'Calendar',
      description: 'Route planning & coordination'
    },
    {
      id: 'reports',
      label: 'Laporan Sampah',
      path: '/waste-reports',
      icon: 'FileText',
      description: 'Collection data tracking'
    },
    {
      id: 'staff',
      label: 'Manajemen Staff',
      path: '/staff-management',
      icon: 'Users',
      description: 'Employee administration'
    },
    {
      id: 'analytics',
      label: 'Analisis & Laporan',
      path: '/analytics-and-reports',
      icon: 'BarChart3',
      description: 'Strategic data visualization'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const handleItemClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 bottom-0 z-50 bg-card border-r border-border shadow-subtle
        transition-transform duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Navigation Header */}
          <div className="p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Recycle" size={18} color="white" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Navigation</h2>
                  <p className="text-xs text-muted-foreground">Municipal Operations</p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Recycle" size={18} color="white" />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems?.map((item) => (
              <div
                key={item?.id}
                className="relative"
                onMouseEnter={() => setHoveredItem(item?.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item?.path}
                  onClick={handleItemClick}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-micro hover-lift
                    ${isActive(item?.path) 
                      ? 'bg-primary text-primary-foreground shadow-subtle' 
                      : 'text-foreground hover:bg-muted hover:text-foreground'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className={`flex-shrink-0 ${isActive(item?.path) ? 'text-primary-foreground' : ''}`}
                  />
                  {!isCollapsed && (
                    <span className="font-medium text-sm">{item?.label}</span>
                  )}
                  {isActive(item?.path) && !isCollapsed && (
                    <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full" />
                  )}
                </Link>

                {/* Tooltip for collapsed state */}
                {isCollapsed && hoveredItem === item?.id && (
                  <div className="absolute left-full top-0 ml-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-modal z-60 whitespace-nowrap animate-fade-in">
                    <p className="text-sm font-medium text-popover-foreground">{item?.label}</p>
                    <p className="text-xs text-muted-foreground">{item?.description}</p>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer Section */}
          <div className="p-4 border-t border-border">
            {!isCollapsed ? (
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
                  iconName="Settings"
                  iconSize={18}
                  onClick={() => console.log('Settings clicked')}
                >
                  System Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
                  iconName="HelpCircle"
                  iconSize={18}
                  onClick={() => console.log('Help clicked')}
                >
                  Help & Support
                </Button>
              </div>
            ) : (
              <div className="space-y-2 flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  iconName="Settings"
                  iconSize={18}
                  onClick={() => console.log('Settings clicked')}
                >
                  <span className="sr-only">Settings</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  iconName="HelpCircle"
                  iconSize={18}
                  onClick={() => console.log('Help clicked')}
                >
                  <span className="sr-only">Help</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;