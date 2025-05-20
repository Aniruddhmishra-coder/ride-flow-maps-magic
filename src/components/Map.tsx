
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { cn } from '@/lib/utils';

type MapProps = {
  className?: string;
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
};

// This is a temporary API key - in production, you should use your own key
// The key should be restricted to your domain for security
const GOOGLE_MAPS_API_KEY = "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"; // Example key, replace with your own

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 37.7749, // San Francisco
  lng: -122.4194
};

const Map: React.FC<MapProps> = ({ className, onLocationSelect }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<google.maps.Marker | null>(null);

  // Store map reference
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setMapLoaded(true);
  }, []);

  // Clear map reference on unmount
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Get user location
  useEffect(() => {
    if (isLoaded && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          // If map is loaded, center it on user location
          if (map) {
            map.panTo({ lat: latitude, lng: longitude });
            map.setZoom(14);
          }
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    }
  }, [isLoaded, map]);

  // Handle click events for location selection
  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!onLocationSelect || !e.latLng) return;
    
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    
    // Create a new marker or move the existing one
    if (currentMarker) {
      currentMarker.setPosition({ lat, lng });
    } else {
      const newMarker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        animation: google.maps.Animation.DROP
      });
      setCurrentMarker(newMarker);
    }
    
    // Get address from coordinates using Google's Geocoder
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      
      if (response.results[0]) {
        onLocationSelect({ 
          lat, 
          lng, 
          address: response.results[0].formatted_address 
        });
      } else {
        onLocationSelect({ lat, lng, address: 'Location selected' });
      }
    } catch (error) {
      console.error('Error getting address:', error);
      onLocationSelect({ lat, lng, address: 'Location selected' });
    }
  };

  if (loadError) {
    return <div className="text-red-500">Error loading maps</div>;
  }

  return (
    <div className={cn("h-full w-full rounded-md overflow-hidden", className)}>
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-primary animate-pulse">Loading map...</div>
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || defaultCenter}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          }}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#1a73e8",
                fillOpacity: 0.6,
                strokeColor: "#1a73e8",
                strokeWeight: 2,
              }}
              title="Your location"
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
