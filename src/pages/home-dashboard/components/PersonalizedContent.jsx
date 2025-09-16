import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from "lucide-react";
import Icon from '../../../components/AppIcon';

const PersonalizedContent = () => {
  const recentActivities = [
    {
      id: 1,
      type: "Laporan",
      title: "Tempat sampah penuh dilaporkan",
      location: "Jl. Panglima Sudirman, Gresik ",
      status: "Diselesaikan",
      date: "2 Hari Lalu",
      icon: "CheckCircle",
      iconColor: "var(--color-success)"
    },
    {
      id: 2,
      type: "Penjemputan",
      title: "Permintaan penjemputan Sampah",
      location: "Jl. Dr Wahidin Sudirohusodo, Gresik",
      status: "Dijadwalkan",
      date: "5 Hari Lalu",
      icon: "Clock",
      iconColor: "var(--color-warning)"
    },
    {
      id: 3,
      type: "Edukasi",
      title: "Kuis daur ulang selesai",
      location: "Pusat Edukasi",
      status: "Selesai",
      date: "1 Minggu Yang Lalu",
      icon: "Award",
      iconColor: "var(--color-accent)"
    }
  ];

  const upcomingPickups = [
    {
      id: 1,
      type: "Penjemputan Reguler",
      date: "Besok",
      time: "07:00 - 11:00 | 12:00 - 17:00",
      items: "Household waste, Recyclables",
      icon: "Trash2"
    },
    {
      id: 2,
      type: "Bulk Pickup",
      date: "Dec 3, 2024",
      time: "10:00 AM - 12:00 PM",
      items: "Furniture, Large items",
      icon: "Truck"
    }
  ];

  const environmentalMetrics = [
    {
      label: "CO₂ Tersimpan",
      value: "127 kg",
      change: "+12%",
      icon: "Leaf",
      color: "text-success"
    },
    {
      label: "Sampah Dialihkan",
      value: "89 kg",
      change: "+8%",
      icon: "Recycle",
      color: "text-primary"
    },
    {
      label: "Peringkat Komunitas",
      value: "#23",
      change: "↑5",
      icon: "TrendingUp",
      color: "text-secondary"
    }
  ];

  return (
    <section className="px-4 lg:px-6 py-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Aktivitas Terbaru</h3>
                <Link 
                  to="/user-profile-settings"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="space-y-4">
                {recentActivities?.map((activity) => (
                  <div key={activity?.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 bg-card rounded-full shadow-subtle">
                      <Icon 
                        name={activity?.icon} 
                        size={18} 
                        color={activity?.iconColor} 
                        strokeWidth={2}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground mb-1">
                        {activity?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity?.location}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className={`
                          text-xs px-2 py-1 rounded-full font-medium
                          ${activity?.status === 'resolved' ? 'bg-success/10 text-success' : 
                            activity?.status === 'scheduled'? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'}
                        `}>
                          {activity?.status}
                        </span>
                        <span className="text-xs text-muted-foreground font-caption">
                          {activity?.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Upcoming Pickups */}
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Pengangkutan Terjadwal</h3>
              
              <div className="space-y-4">
                {upcomingPickups?.map((pickup) => (
                  <div key={pickup?.id} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-foreground mb-1">
                          {pickup?.type}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {pickup?.date} • {pickup?.time}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {pickup?.items}
                        </p>
                      </div>
                      <Icon 
                        name={pickup?.icon} 
                        size={16} 
                        color="var(--color-primary)" 
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/request-pickup-service">
              <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Jadwalkan Penjemputan Baru
              </button>
              </Link>
            </div>

            {/* Environmental Impact */}
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Dampak Anda</h3>
              
              <div className="space-y-4">
                {environmentalMetrics?.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                        <Icon 
                          name={metric?.icon} 
                          size={16} 
                          color="currentColor" 
                          className={metric?.color}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {metric?.label}
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">
                        {metric?.value}
                      </div>
                      <div className={`text-xs ${metric?.color} font-medium`}>
                        {metric?.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Trophy" size={16} color="var(--color-accent)" />
                  <span className="text-sm font-medium text-accent">
                    Eco Champion Badge Earned!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedContent;