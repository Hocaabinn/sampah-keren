import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  navigationItems, 
  currentPath, 
  user, 
  onSignOut, 
  onShowLogin, 
  onShowRegister 
}) => {
  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const isActivePath = (path) => {
    return currentPath === path;
  };

  const handleLinkClick = () => {
    onClose?.();
  };

  const handleAuthAction = (action) => {
    onClose?.();
    action?.();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Menu */}
      <div className="fixed top-16 right-0 z-50 w-80 h-full bg-card shadow-lg transform transition-transform md:hidden">
        <div className="flex flex-col h-full">
          {/* User Section */}
          {user ? (
            <div className="px-6 py-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={18} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 py-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Welcome to SmartWaste
              </p>
              <div className="flex flex-col space-y-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleAuthAction(onShowRegister)}
                  iconName="UserPlus"
                  iconPosition="left"
                  className="justify-start"
                >
                  Create Account
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAuthAction(onShowLogin)}
                  iconName="LogIn"
                  iconPosition="left"
                  className="justify-start"
                >
                  Sign In
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={handleLinkClick}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color="currentColor" 
                  strokeWidth={2}
                />
                <div className="flex-1">
                  <div className="font-medium">{item?.label}</div>
                  <div className="text-xs opacity-75 mt-0.5">
                    {item?.tooltip}
                  </div>
                </div>
              </Link>
            ))}
          </nav>

          {/* Sign Out Section */}
          {user && (
            <div className="px-6 py-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAuthAction(onSignOut)}
                iconName="LogOut"
                iconPosition="left"
                className="w-full justify-start"
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;