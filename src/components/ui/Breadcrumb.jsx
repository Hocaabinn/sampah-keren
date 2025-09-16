import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();

  const pathMap = {
    '/dashboard-overview': { label: 'Dashboard Overview', icon: 'LayoutDashboard' },
    '/waste-pickup-requests': { label: 'Pickup Requests', icon: 'Truck' },
    '/service-schedule': { label: 'Service Schedule', icon: 'Calendar' },
    '/waste-reports': { label: 'Waste Reports', icon: 'FileText' },
    '/staff-management': { label: 'Staff Management', icon: 'Users' },
    '/analytics-and-reports': { label: 'Analytics & Reports', icon: 'BarChart3' }
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return [
        { label: 'Home', path: '/dashboard-overview', icon: 'Home' },
        ...customItems
      ];
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/dashboard-overview', icon: 'Home' }];

    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const pathInfo = pathMap?.[currentPath];
      if (pathInfo) {
        breadcrumbs?.push({
          label: pathInfo?.label,
          path: currentPath,
          icon: pathInfo?.icon
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          
          return (
            <li key={crumb?.path || index} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="mx-2 text-muted-foreground/60" 
                />
              )}
              {isLast ? (
                <span className="flex items-center gap-2 text-foreground font-medium">
                  <Icon name={crumb?.icon} size={16} />
                  <span className="hidden sm:inline">{crumb?.label}</span>
                  <span className="sm:hidden">{crumb?.label?.split(' ')?.[0]}</span>
                </span>
              ) : (
                <Link
                  to={crumb?.path}
                  className="flex items-center gap-2 hover:text-foreground transition-micro hover-lift"
                >
                  <Icon name={crumb?.icon} size={16} />
                  <span className="hidden sm:inline">{crumb?.label}</span>
                  <span className="sm:hidden">{crumb?.label?.split(' ')?.[0]}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;