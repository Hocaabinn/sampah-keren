import React from 'react';
import Icon from '../../../../components/AppIcon';

const StaffStats = ({ staff }) => {
  const totalStaff = staff?.length;
  const activeStaff = staff?.filter(s => s?.status === 'active')?.length;
  const availableStaff = staff?.filter(s => s?.assignmentStatus === 'available')?.length;
  const onLeaveStaff = staff?.filter(s => s?.status === 'on_leave')?.length;
  
  const avgPerformance = staff?.length > 0 
    ? Math.round(staff?.reduce((sum, s) => sum + s?.performance?.score, 0) / staff?.length)
    : 0;

  const stats = [
    {
      id: 'total',
      label: 'Total Staf',
      value: totalStaff,
      icon: 'Users',
      color: 'text-foreground',
      bgColor: 'bg-muted'
    },
    {
      id: 'active',
      label: 'Aktif Staff',
      value: activeStaff,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'Tersedia',
      label: 'Available',
      value: availableStaff,
      icon: 'Clock',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'on_leave',
      label: 'Cuti',
      value: onLeaveStaff,
      icon: 'Calendar',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'performance',
      label: 'Rata-rata kinerja',
      value: `${avgPerformance}%`,
      icon: 'TrendingUp',
      color: avgPerformance >= 85 ? 'text-success' : avgPerformance >= 70 ? 'text-warning' : 'text-error',
      bgColor: avgPerformance >= 85 ? 'bg-success/10' : avgPerformance >= 70 ? 'bg-warning/10' : 'bg-error/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card rounded-lg border border-border p-4 hover:shadow-subtle transition-micro"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat?.label}</p>
              <p className={`text-2xl font-semibold ${stat?.color}`}>
                {stat?.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffStats;