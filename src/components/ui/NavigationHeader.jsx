import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import MobileMenu from './MobileMenu';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import Button from './Button';

const NavigationHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigationItems = [
    { 
      label: 'Beranda', 
      path: '/home-dashboard', 
      icon: 'Home',
      tooltip: 'Seputar Tampilan Beranda'
    },
    { 
      label: 'Laporkan', 
      path: '/report-waste-issue', 
      icon: 'AlertTriangle',
      tooltip: 'Laporkan masalah sampah di daerah Anda'
    },
    { 
      label: 'Permintaan', 
      path: '/request-pickup-service', 
      icon: 'Truck',
      tooltip: 'Jadwal Penjemputan Sampah'
    },
    { 
      label: 'Edukasi Sampah', 
      path: '/waste-education-hub', 
      icon: 'BookOpen',
      tooltip: 'Edukasi Dan Tips Pengelolaan Sampah'
    },
    { 
      label: 'Profile', 
      path: '/user-profile-settings', 
      icon: 'User',
      tooltip: 'Settings Profile Anda Sesuai Dengan Data Anda'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Recycle" size={24} color="white" strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold text-foreground">
                GresikResik
              </h1>
              <p className="text-xs font-caption text-muted-foreground -mt-1">
                Portal Pengelolaan Sampah
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  group relative flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium
                  transition-smooth hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                title={item?.tooltip}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  color="currentColor" 
                  strokeWidth={2}
                />
                <span>{item?.label}</span>
                
                {/* Active indicator */}
                {isActivePath(item?.path) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {user?.user_metadata?.full_name || user?.email?.split('@')?.[0] || 'User'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  iconName="LogOut"
                  iconPosition="left"
                  className="hidden md:flex"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLoginModal(true)}
                  iconName="LogIn"
                  iconPosition="left"
                  className="hidden md:flex"
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setShowRegisterModal(true)}
                  iconName="UserPlus"
                  iconPosition="left"
                  className="hidden md:flex"
                >
                  Register
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle mobile menu"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
                color="currentColor" 
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        navigationItems={navigationItems}
        currentPath={location?.pathname}
        user={user}
        onSignOut={handleSignOut}
        onShowLogin={() => setShowLoginModal(true)}
        onShowRegister={() => setShowRegisterModal(true)}
      />

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default NavigationHeader;