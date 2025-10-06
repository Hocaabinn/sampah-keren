import React, { useState, useEffect, useMemo} from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import PickupRequestForm from './components/PickupRequestForm';
import PickupHistory from './components/PickupHistory';
import UpcomingPickups from './components/UpcomingPickups';
import NearbyServices from './components/NearbyServices';
import ServiceAvailability from './components/ServiceAvailability';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';

const RequestPickupService = () => {
  const [pickupRequests, setPickupRequests] = useState([]);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(true)
  // Mock data for pickup requests
  

  // Mock data for upcoming pickups
  const upcomingPickups = useMemo(() => {
    return pickupRequests.filter(req => 
      ['scheduled', 'in-progress'].includes(req.status)
    );
  }, [pickupRequests]);

  // Mock data for nearby services
  const nearbyServices = [];

  // Mock data for service availability
  const serviceAvailability = {
    today: [
      {
        timeSlot: "morning",
        status: "unavailable",
        message: "Fully booked",
        slotsRemaining: 0
      },
      {
        timeSlot: "afternoon",
        status: "limited",
        message: "Limited availability",
        slotsRemaining: 2
      },
      {
        timeSlot: "evening",
        status: "available",
        message: "Available",
        slotsRemaining: 8
      }
    ],
    tomorrow: [
      {
        timeSlot: "morning",
        status: "available",
        message: "Available",
        slotsRemaining: 12
      },
      {
        timeSlot: "afternoon",
        status: "available",
        message: "Available",
        slotsRemaining: 15
      },
      {
        timeSlot: "evening",
        status: "limited",
        message: "Limited availability",
        slotsRemaining: 3
      }
    ]
  };

  useEffect(() => {
    console.log('🔥 useEffect dipanggil — mulai fetch data dari Supabase');
    const fetchPickupRequests = async () => {
      setLoading(true);
      try {
        console.log('📡 Mengirim request ke Supabase...');
        const { data, error } = await supabase
          .from('pickup_request')
          .select('*')
          .order('created_at', { ascending: false });

          if (error) {
            console.error('❌ ERROR SUPABASE:', error);
            alert(`Gagal muat data: ${error.message}`);
            return;
          }
    

        // Sesuaikan format data agar sesuai dengan ekspektasi komponen
        const formattedData = data.map(req => ({
          id: req.id,
          name: req.name,
          address: req.address,
          date: req.pickup_date, // sesuaikan nama kolom
          timeSlot: req.pickup_time,
          wasteType: req.waste_type,
          quantity: req.waste_quantity,
          specialInstructions: req.intruksi || '',
          status: req.status || 'scheduled',
          requestDate: req.created_at,
          estimatedPickup: req.pickup_date ? new Date(req.pickup_date).toISOString() : null
        }));

        setPickupRequests(formattedData);
      } catch (err) {
        console.error('Error fetching pickup requests:', err);
        // Opsional: tampilkan error ke user
      } finally {
        setLoading(false);
      }
    };

    fetchPickupRequests();
  }, []);

  const handleNewPickupRequest = async (newRequest) => {
    try {
      // Simpan ke Supabase
      const { error } = await supabase
        .from('pickup_request')
        .insert([
          {
            name: newRequest.name,
            address: newRequest.address,
            pickup_date: newRequest.date,
            pickup_time: newRequest.timeSlot,
            waste_type: newRequest.wasteType,
            waste_quantity: newRequest.quantity,
            intruksi: newRequest.specialInstructions,
            // created_at akan otomatis diisi oleh Supabase
          }
        ]);

      if (error) throw error;

      // Tambahkan ke state lokal (tanpa reload halaman)
      setPickupRequests(prev => [newRequest, ...prev]);
      setShowSuccessMessage(true);

      setTimeout(() => setShowSuccessMessage(false), 5000);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      console.error('Gagal menyimpan ke Supabase:', err);
      alert('Gagal menyimpan permintaan. Coba lagi.');
    }
  };

  const handleViewAllHistory = () => {
    setShowAllHistory(true);
  };

  const handleModifyPickup = (pickupId) => {
    console.log('Modify pickup:', pickupId);
    // Implementation for modifying pickup
  };

  const handleCancelPickup = (pickupId) => {
    console.log('Cancel pickup:', pickupId);
    // Implementation for canceling pickup
  };

  const handleGetDirections = (service) => {
    console.log('Get directions to:', service?.name);
    // Implementation for getting directions
  };

  const dismissSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <BreadcrumbTrail />
      
      <main className="pt-4 pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                <div>
                  <p className="font-medium text-success">Pickup Request Submitted Successfully!</p>
                  <p className="text-sm text-success/80">You'll receive a confirmation email shortly with pickup details.</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={dismissSuccessMessage}
                iconName="X"
                className="text-success hover:text-success/80"
              />
            </div>
          )}

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                <Icon name="Truck" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Jadwalkan Pengangkutan Sampah </h1>
                <p className="text-lg text-muted-foreground"> Atur waktu pengangkutan sampah sesuai kebutuhan Anda</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={18} color="var(--color-primary)" />
                <div>
                  <p className="text-sm font-medium text-foreground">Jadwal Tersedia Berikutnya</p>
                  <p className="text-xs text-muted-foreground">Mulai Pukul 08:00 WIB</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={18} color="var(--color-secondary)" />
                <div>
                  <p className="text-sm font-medium text-foreground">Wilayah Layanan</p>
                  <p className="text-xs text-muted-foreground">Untuk Semua Wilayah Gresik</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={18} color="var(--color-accent)" />
                <div>
                  <p className="text-sm font-medium text-foreground">Bantuan</p>
                  <p className="text-xs text-muted-foreground">(+62) 9820192 - Admin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Request Form and Availability */}
            <div className="xl:col-span-2 space-y-8">
              <PickupRequestForm onSubmit={handleNewPickupRequest} />
              <ServiceAvailability availability={serviceAvailability} />
            </div>

            {/* Right Column - History and Services */}
            <div className="space-y-8">
              <UpcomingPickups 
                upcomingPickups={upcomingPickups}
                onModify={handleModifyPickup}
                onCancel={handleCancelPickup}
              />
              <PickupHistory 
                requests={pickupRequests}
                onViewAll={handleViewAllHistory}
              />
            </div>
          </div>

          {/* Nearby Services Section */}
          <div className="mt-12">
            <NearbyServices 
              nearbyServices={nearbyServices}
              onGetDirections={handleGetDirections}
            />
          </div>

          {/* Help Section */}
          <div className="mt-12 p-6 bg-card rounded-lg border border-border shadow-card">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
              <h2 className="text-xl font-semibold text-foreground">Need Help?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-foreground mb-2">Pickup Guidelines</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Place waste containers at the curb by 7:00 AM</li>
                  <li>• Separate recyclables from regular waste</li>
                  <li>• Hazardous materials require special handling</li>
                  <li>• Maximum weight limit: 50 lbs per container</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-2">Contact Support</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Phone" size={14} />
                    <span>(555) 123-WASTE</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Mail" size={14} />
                    <span>support@smartwaste.gov</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="MessageCircle" size={14} />
                    <span>Live chat available 8 AM - 6 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RequestPickupService;