import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const LocationSelector = ({ selectedLocation, onLocationChange, error }) => {
  const [useMap, setUseMap] = useState(true);
  const [address, setAddress] = useState('');

  // ambil lokasi user asli
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            address: 'Lokasi saat ini (GPS)' // bisa nanti diganti hasil reverse geocoding
          };
          onLocationChange(coords);
          setAddress(coords.address);
        },
        (err) => {
          console.error(err);
          alert('Gagal mengambil lokasi. Pastikan GPS aktif.');
        }
      );
    } else {
      alert('Browser tidak mendukung geolocation');
    }
  };

  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);

    // di sini idealnya kamu pakai API geocoding Google/OSM
    if (newAddress?.length > 10) {
      const mockGeocodedLocation = {
        lat: -7.1561 + Math.random() * 0.01, // contoh random di sekitar Gresik
        lng: 112.6514 + Math.random() * 0.01,
        address: newAddress,
      };
      onLocationChange(mockGeocodedLocation);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Lokasi</h3>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setUseMap(true)}
            className={`px-3 py-1 text-sm rounded-md transition-smooth ${
              useMap
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => setUseMap(false)}
            className={`px-3 py-1 text-sm rounded-md transition-smooth ${
              !useMap
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Alamat
          </button>
        </div>
      </div>

      {/* Mode Map */}
      {useMap ? (
        <div className="space-y-3">
          <div className="relative h-64 bg-muted rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Waste Issue Location"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${selectedLocation?.lat || -7.1561},${selectedLocation?.lng || 112.6514}&z=15&output=embed`}
              className="border-0"
            />
            <div className="absolute top-2 right-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                iconName="MapPin"
                iconPosition="left"
                onClick={handleUseCurrentLocation}
              >
                Use Current
              </Button>
            </div>
          </div>
          {selectedLocation && (
            <div className="flex items-start space-x-2 p-3 bg-muted/50 rounded-md">
              <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="font-medium text-foreground">Selected Location</p>
                <p className="text-muted-foreground">{selectedLocation?.address}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Coordinates: {selectedLocation?.lat?.toFixed(4)}, {selectedLocation?.lng?.toFixed(4)}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Mode Input Alamat
        <div className="space-y-3">
          <Input
            label="Street Address"
            type="text"
            placeholder="Masukkan alamat lokasi sampah"
            value={address}
            onChange={handleAddressChange}
            error={error}
            required
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            iconName="Navigation"
            iconPosition="left"
            onClick={handleUseCurrentLocation}
            className="w-full sm:w-auto"
          >
            Use My Current Location
          </Button>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-sm text-error">
          <Icon name="AlertCircle" size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
