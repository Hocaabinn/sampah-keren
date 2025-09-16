import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToActionCard = () => {
  return (
    <section className="px-4 lg:px-6 py-12 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12 text-center overflow-hidden shadow-modal">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-6">
              <Icon name="Heart" size={32} color="white" strokeWidth={2} />
            </div>

            {/* Content */}
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Jadilah Bagian dari Solusi
            </h2>
            
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Setiap tindakan kecil berkontribusi untuk kota yang lebih bersih dan hijau. Bergabunglah dengan komunitas peduli lingkungan dan buat perubahan nyata di lingkungan kita.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/report-waste-issue">
                <Button 
                  variant="secondary" 
                  size="lg"
                  iconName="AlertTriangle"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Laporkan Masalah
                </Button>
              </Link>
              
              <Link to="/waste-education-hub">
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="BookOpen"
                  iconPosition="left"
                  className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>

            {/* Achievement Badge */}
            <div className="mt-8 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Icon name="Star" size={16} color="white" />
              <span className="text-sm font-medium text-white">
                Bergabung dengan 1.293+ Warga Aktif
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionCard;