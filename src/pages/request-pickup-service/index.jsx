import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import PickupRequestForm from './components/PickupRequestForm';
import PickupHistory from './components/PickupHistory';
import UpcomingPickups from './components/UpcomingPickups';
import NearbyServices from './components/NearbyServices';
import ServiceAvailability from './components/ServiceAvailability';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RequestPickupService = () => {
  const [pickupRequests, setPickupRequests] = useState([]);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock data for pickup requests
  const mockPickupRequests = [
    {
      id: 1001,
      address: "123 Oak Street, Downtown District",
      date: "2025-09-02",
      timeSlot: "morning",
      wasteType: "household",
      quantity: "medium",
      specialInstructions: "Please collect from side gate",
      status: "scheduled",
      requestDate: "2025-08-28T10:30:00Z",
      estimatedPickup: "2025-09-02T09:00:00Z"
    },
    {
      id: 1002,
      address: "456 Pine Avenue, Residential Area",
      date: "2025-08-25",
      timeSlot: "afternoon",
      wasteType: "recyclable",
      quantity: "large",
      specialInstructions: "",
      status: "completed",
      requestDate: "2025-08-20T14:15:00Z",
      estimatedPickup: "2025-08-25T14:00:00Z"
    },
    {
      id: 1003,
      address: "789 Maple Drive, Suburb Heights",
      date: "2025-08-30",
      timeSlot: "evening",
      wasteType: "bulk",
      quantity: "bulk",
      specialInstructions: "Old furniture - sofa and table",
      status: "in-progress",
      requestDate: "2025-08-26T16:45:00Z",
      estimatedPickup: "2025-08-30T17:00:00Z"
    },
    {
      id: 1004,
      address: "321 Cedar Lane, Green Valley",
      date: "2025-08-22",
      timeSlot: "morning",
      wasteType: "organic",
      quantity: "small",
      specialInstructions: "",
      status: "completed",
      requestDate: "2025-08-18T09:20:00Z",
      estimatedPickup: "2025-08-22T10:30:00Z"
    }
  ];

  // Mock data for upcoming pickups
  const upcomingPickups = mockPickupRequests?.filter(request => 
    request?.status === 'scheduled' || request?.status === 'in-progress'
  );

  // Mock data for nearby services
  const nearbyServices = [
    {
      id: 1,
      name: "Central Recycling Center",
      type: "recycling",
      address: "100 Industrial Blvd, City Center",
      distance: 2.3,
      hours: { open: "08:00", close: "18:00" },
      rating: 4.5,
      reviews: 128,
      phone: "(555) 123-4567",
      acceptedWaste: ["Paper", "Plastic", "Glass", "Metal"]
    },
    {
      id: 2,
      name: "Community Drop-off Point",
      type: "drop-off",
      address: "45 Main Street, Downtown",
      distance: 0.8,
      hours: { open: "06:00", close: "22:00" },
      rating: 4.2,
      reviews: 89,
      acceptedWaste: ["Household", "Small Electronics"]
    },
    {
      id: 3,
      name: "Hazardous Waste Facility",
      type: "hazardous",
      address: "200 Safety Drive, Industrial Zone",
      distance: 5.1,
      hours: { open: "09:00", close: "16:00" },
      rating: 4.8,
      reviews: 45,
      phone: "(555) 987-6543",
      acceptedWaste: ["Batteries", "Paint", "Chemicals", "Electronics"]
    },
    {
      id: 4,
      name: "Bulk Item Collection",
      type: "bulk",
      address: "75 Warehouse Road, South District",
      distance: 3.7,
      hours: { open: "07:00", close: "17:00" },
      rating: 4.1,
      reviews: 67,
      acceptedWaste: ["Furniture", "Appliances", "Large Items"]
    }
  ];

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
    setPickupRequests(mockPickupRequests);
  }, []);

  const handleNewPickupRequest = (newRequest) => {
    setPickupRequests(prev => [newRequest, ...prev]);
    setShowSuccessMessage(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);

    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
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