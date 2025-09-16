import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceAvailability = ({ availability }) => {
  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10 border-success/20';
      case 'limited':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'unavailable':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getAvailabilityIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'limited':
        return 'AlertCircle';
      case 'unavailable':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const formatTimeSlot = (slot) => {
    const timeMap = {
      'morning': '8:00 AM - 12:00 PM',
      'afternoon': '12:00 PM - 4:00 PM',
      'evening': '4:00 PM - 8:00 PM'
    };
    return timeMap?.[slot] || slot;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="Clock" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Ketersediaan Layanan</h2>
          <p className="text-sm text-muted-foreground">Slot Penjemputan Seacara Real-Time</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Today's Availability */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Calendar" size={18} color="var(--color-primary)" />
            <span>Today - {new Date()?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availability?.today?.map((slot) => (
              <div
                key={slot?.timeSlot}
                className={`p-4 rounded-lg border ${getAvailabilityColor(slot?.status)}`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon 
                    name={getAvailabilityIcon(slot?.status)} 
                    size={18} 
                    color="currentColor" 
                  />
                  <span className="font-medium">{formatTimeSlot(slot?.timeSlot)}</span>
                </div>
                
                <p className="text-sm opacity-80 mb-2">{slot?.message}</p>
                
                {slot?.slotsRemaining !== undefined && (
                  <div className="text-xs opacity-70">
                    {slot?.slotsRemaining > 0 
                      ? `${slot?.slotsRemaining} slots remaining`
                      : 'Fully booked'
                    }
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tomorrow's Availability */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Calendar" size={18} color="var(--color-primary)" />
            <span>Tomorrow - {new Date(Date.now() + 86400000)?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availability?.tomorrow?.map((slot) => (
              <div
                key={slot?.timeSlot}
                className={`p-4 rounded-lg border ${getAvailabilityColor(slot?.status)}`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon 
                    name={getAvailabilityIcon(slot?.status)} 
                    size={18} 
                    color="currentColor" 
                  />
                  <span className="font-medium">{formatTimeSlot(slot?.timeSlot)}</span>
                </div>
                
                <p className="text-sm opacity-80 mb-2">{slot?.message}</p>
                
                {slot?.slotsRemaining !== undefined && (
                  <div className="text-xs opacity-70">
                    {slot?.slotsRemaining > 0 
                      ? `${slot?.slotsRemaining} slots remaining`
                      : 'Fully booked'
                    }
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Service Notice */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={18} color="var(--color-primary)" className="mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Informasi Layanan</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Slot penjemputan diperbarui secara real-time sesuai rute terbaik</li>
                <li>• Kondisi cuaca dapat memengaruhi ketersediaan layanan</li>
                <li>• Jadwal hari libur bisa berbeda – cek notifikasi untuk pembaruan</li>
                <li>• Tersedia penjemputan darurat untuk sampah berbahaya</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Alternative Options */}
        <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={18} color="var(--color-accent)" className="mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Opsi Alternatif</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Jika slot waktu yang Anda pilih tidak tersedia, Anda bisa:</p>
                <ul className="ml-4 space-y-1">
                  <li>• Menjadwalkan penjemputan di hari berikutnya</li>
                  <li>• Menghubungi layanan dukungan untuk opsi darurat</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAvailability;