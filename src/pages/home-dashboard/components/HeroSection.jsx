import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import TextType from 'components/TextType/TextType';
import sampah1 from "../../../image/sampah1.png"; 



const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 px-4 lg:px-6 py-12 lg:py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full animate-pulse-slow"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-secondary rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
              <Icon name="Leaf" size={24} color="var(--color-primary)" strokeWidth={2.5} />
              <span className="text-sm font-medium text-primary font-caption">
                Plaftform Pelaporan Sampah
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-5xl font-bold text-green-600 mb-4 leading-tight">
              Selamat Datang di
              <span className="bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent font-Garamond">
                <TextType
                  text={["GresikResik Portal","Portal Informasi","Pelaporan Sampah"]}
                  loop
                  speed={100}
                  deleteSpeed={50}
                  delay={1500}
                />
            </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
            Bergabunglah dengan ratusan warga untuk menjadikan kota kita lebih bersih dan hijau.
             Laporkan masalah, minta layanan penjemputan, dan pelajari praktik berkelanjutan - semuanya di satu tempat.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">280</div>
                <div className="text-sm text-muted-foreground font-caption">Keluhan yang Ditangani</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-gray-500 font-bold text-primary">300</div>
                <div className="text-sm text-gray-500 font-caption">Warga Aktif</div>
              </div>
              <div className="text-center">
              <div className="text-2xl text-gray-500 font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground font-caption">Rating Good</div>
              </div>
            </div>

            {/* CTA Badge */}
            <div className="inline-flex items-center space-x-2 bg-card px-4 py-2 rounded-full shadow-subtle border border-border">
              <Icon name="Award" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-foreground">
                Eco-Friendly Community Leader
              </span>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl p-8 shadow-card border border-border">
            <img 
                  src={sampah1} 
                  alt="Clean city environment with recycling and waste management" 
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-success text-success-foreground px-3 py-2 rounded-lg shadow-card">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} color="currentColor" />
                  <span className="text-sm font-medium">Issue Resolved</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-3 py-2 rounded-lg shadow-card">
                <div className="flex items-center space-x-2">
                  <Icon name="Truck" size={16} color="currentColor" />
                  <span className="text-sm font-medium">Pickup Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;