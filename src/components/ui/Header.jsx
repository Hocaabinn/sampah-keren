import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'New pickup request', message: 'Route 15 - Maple Street', time: '5 min ago', unread: true },
    { id: 2, title: 'Schedule updated', message: 'Morning routes adjusted', time: '1 hour ago', unread: true },
    { id: 3, title: 'Staff check-in', message: 'Team Alpha completed route', time: '2 hours ago', unread: false }
  ]);
  const location = useLocation();

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const handleProfileAction = (action) => {
    console.log('Profile action:', action);
    setIsProfileOpen(false);
  };

  const getPageTitle = () => {
    const pathMap = {
      '/dashboard-overview': 'Dashboard Overview',
      '/waste-pickup-requests': 'Permintaan Penjemputan Sampah',
      '/service-schedule': 'Service Schedule',
      '/waste-reports': 'Waste Reports',
      '/staff-management': 'Staff Management',
      '/analytics-and-reports': 'Analytics & Reports'
    };
    return pathMap?.[location?.pathname] || 'EcoWaste Dashboard';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section - Menu Toggle & Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
            iconName="Menu"
            iconSize={20}
          >
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Recycle" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">GresikResik</h1>
              <p className="text-xs text-muted-foreground -mt-1">Municipal Dashboard</p>
            </div>
          </div>
        </div>

        {/* Center Section - Page Title (Hidden on mobile) */}
        <div className="hidden md:block">
          <h2 className="text-sm font-medium text-muted-foreground">
            {getPageTitle()}
          </h2>
        </div>

        {/* Right Section - Search, Notifications, Profile */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            {isSearchExpanded ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <Input
                  type="search"
                  placeholder="Search requests, routes, staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64 h-9 text-sm"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSearchExpanded(false);
                    setSearchQuery('');
                  }}
                  className="ml-1"
                  iconName="X"
                  iconSize={16}
                >
                  <span className="sr-only">Close search</span>
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchExpanded(true)}
                className="transition-micro hover-lift"
                iconName="Search"
                iconSize={18}
              >
                <span className="sr-only">Open search</span>
              </Button>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log('Toggle notifications')}
              className="transition-micro hover-lift relative"
              iconName="Bell"
              iconSize={18}
            >
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 transition-micro hover-lift"
            >
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium">Admin</span>
              <Icon name="ChevronDown" size={14} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal py-2 animate-fade-in">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-sm font-medium">Municipal Admin</p>
                  <p className="text-xs text-muted-foreground">admin@ecowaste.gov</p>
                </div>
                <button
                  onClick={() => handleProfileAction('profile')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-micro flex items-center gap-2"
                >
                  <Icon name="User" size={16} />
                  Profile Settings
                </button>
                <button
                  onClick={() => handleProfileAction('preferences')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-micro flex items-center gap-2"
                >
                  <Icon name="Settings" size={16} />
                  Preferences
                </button>
                <button
                  onClick={() => handleProfileAction('help')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-micro flex items-center gap-2"
                >
                  <Icon name="HelpCircle" size={16} />
                  Help & Support
                </button>
                <div className="border-t border-border mt-2 pt-2">
                  <button
                    onClick={() => handleProfileAction('logout')}
                    className="w-full px-3 py-2 text-left text-sm text-error hover:bg-muted transition-micro flex items-center gap-2"
                  >
                    <Icon name="LogOut" size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Search Overlay */}
      {isSearchExpanded && (
        <div className="md:hidden border-t border-border bg-card p-4">
          <form onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Search requests, routes, staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
              autoFocus
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;