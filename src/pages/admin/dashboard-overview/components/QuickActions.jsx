import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../../../../components/ui/Button";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'new-request',
      label: 'Permintaan Penjemputan Baru',
      description: 'Buat permintaan penjemputan sampah baru',
      icon: 'Plus',
      variant: 'default',
      onClick: () => navigate('/waste-pickup-requests')
    },
    {
      id: 'Kelola Jadwal',
      label: 'Kelola Jadwal',
      description: 'Perbarui rute dan waktu layanan',
      icon: 'Calendar',
      variant: 'outline',
      onClick: () => navigate('/service-schedule')
    },
    {
      id: 'Buat Laporan',
      label: 'Buat Laporan',
      description: 'Buat laporan analitik dan kinerja',
      icon: 'FileText',
      variant: 'outline',
      onClick: () => navigate('/analytics-and-reports')
    },
    {
      id: 'Manajemen Staf',
      label: 'Staff Management',
      description: 'Kelola penugasan dan jadwal tim',
      icon: 'Users',
      variant: 'outline',
      onClick: () => navigate('/staff-management')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Aksi Cepat</h3>
        <p className="text-sm text-muted-foreground">Tugas administratif umum</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action) => (
          <div key={action?.id} className="group">
            <Button
              variant={action?.variant}
              onClick={action?.onClick}
              className="w-full h-auto p-4 flex-col gap-3 hover-lift transition-micro"
              iconName={action?.icon}
              iconSize={24}
            >
              <div className="text-center">
                <div className="font-medium text-sm mb-1">{action?.label}</div>
                <div className="text-xs text-muted-foreground opacity-80">
                  {action?.description}
                </div>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;