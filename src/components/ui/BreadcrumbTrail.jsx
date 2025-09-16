import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = () => {
  const location = useLocation();
  
  const pathLabels = {
    '/dashboard-overview': { label: 'Dashboard Overview', icon: 'LayoutDashboard' },
    '/home-dashboard': 'Dashboard',
    '/report-waste-issue': 'Report Issue',
    '/request-pickup-service': 'Request Pickup',
    '/waste-education-hub': 'Education Hub',
    '/user-profile-settings': 'Profile & Settings'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/home-dashboard' }];

    if (location?.pathname !== '/home-dashboard') {
      const currentLabel = pathLabels?.[location?.pathname];
      if (currentLabel) {
        breadcrumbs?.push({ 
          label: currentLabel, 
          path: location?.pathname,
          isActive: true 
        });
      }
    } else {
      breadcrumbs[0].isActive = true;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs if only home
  if (breadcrumbs?.length <= 1 && location?.pathname === '/home-dashboard') {
    return null;
  }

  return (
    <nav 
      className="flex items-center space-x-2 px-4 lg:px-6 py-3 text-sm bg-muted/30 border-b border-border"
      aria-label="Breadcrumb navigation"
    >
      <Icon 
        name="Home" 
        size={16} 
        color="currentColor" 
        className="text-muted-foreground"
      />
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={16} 
              color="currentColor" 
              className="text-muted-foreground"
            />
          )}
          
          {crumb?.isActive ? (
            <span className="font-medium text-foreground font-body">
              {crumb?.label}
            </span>
          ) : (
            <Link
              to={crumb?.path}
              className="text-muted-foreground hover:text-foreground transition-smooth font-body hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded px-1"
            >
              {crumb?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbTrail;