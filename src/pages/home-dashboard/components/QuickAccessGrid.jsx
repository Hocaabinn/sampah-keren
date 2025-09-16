import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import SpotlightCard from '../../../components/SpotlightCard'; // pastikan path benar

const QuickAccessGrid = () => {
  const quickAccessItems = [
    {
      id: 1,
      title: "Laporkan Masalah Sampah",
      description: "Laporkan pembuangan ilegal, tempat sampah yang penuh, atau sampah berbahaya di area Anda",
      icon: "AlertTriangle",
      path: "/report-waste-issue",
      color: "bg-red-50 border-red-200",
      iconColor: "var(--color-error)",
      stats: "247 laporan bulan ini"
    },
    {
      id: 2,
      title: "Permintaan Penjemputan Sampah",
      description: "Pengangkutan Sampah Dijemput Sesuai Jadwal yang tertera",
      icon: "Truck",
      path: "/request-pickup-service",
      color: "bg-blue-50 border-blue-200",
      iconColor: "var(--color-secondary)",
      stats: "Operasi Saat Jam Kerja"
    },
    {
      id: 3,
      title: "Edukasi Pengelolaan Sampah",
      description: "Belajar cara menjadikan kota kita bersih dan berkelanjutan",
      icon: "BookOpen",
      path: "/waste-education-hub",
      color: "bg-green-50 border-green-200",
      iconColor: "var(--color-primary)",
      stats: "10 artikel terbaru"
    },
    {
      id: 4,
      title: "Acara Komunitas",
      description: "Ikuti kegiatan bersih-bersih, lokakarya daur ulang, dan program kesadaran lingkungan",
      icon: "Users",
      path: "/waste-education-hub",
      color: "bg-purple-50 border-purple-200",
      iconColor: "#8B5CF6",
      stats: "3 acara akhir pekan ini"
    }
  ];

  return (
    <section className="px-4 lg:px-6 py-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Layanan Akses Cepat
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk berpartisipasi menjadikan kota kita lebih bersih dan berkelanjutan
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccessItems?.map((item) => (
            <Link key={item?.id} to={item?.path} className="group block">
              <SpotlightCard>
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 bg-card rounded-lg shadow-subtle mb-4 group-hover:scale-110 transition-transform">
                  <Icon 
                    name={item?.icon} 
                    size={24} 
                    color={item?.iconColor} 
                    strokeWidth={2}
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item?.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {item?.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground font-caption">
                    {item?.stats}
                  </span>
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    color="currentColor" 
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                  />
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessGrid;
