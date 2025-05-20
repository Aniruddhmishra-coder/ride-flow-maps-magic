
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type MapProps = {
  className?: string;
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
};

const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHVjYmFiNnAwY2E5MnFwOTI1cXJqYjc4In0.u99S7FuzEF3q30vnEKmOIA"; // Public demo token

const Map: React.FC<MapProps> = ({ className, onLocationSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  // Initialize map when component mounts
  useEffect(() => {
    const initializeMap = async () => {
      if (map.current) return;
      
      // Dynamically import mapbox-gl
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      if (!mapContainer.current) return;
      
      // Use demo token - in a real app, this would be stored securely
      mapboxgl.default.accessToken = MAPBOX_TOKEN;
      
      map.current = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40], // Default location (NYC area)
        zoom: 9,
      });
      
      // Add navigation controls
      map.current.addControl(new mapboxgl.default.NavigationControl(), 'top-right');
      
      // Wait for map to load before triggering events
      map.current.on('load', () => {
        setMapLoaded(true);
        
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lng: longitude });
              
              // Fly to user location
              map.current.flyTo({
                center: [longitude, latitude],
                essential: true,
                zoom: 14
              });
              
              // Add marker for user location
              const el = document.createElement('div');
              el.className = 'current-location-pulse';
              
              new mapboxgl.default.Marker(el)
                .setLngLat([longitude, latitude])
                .addTo(map.current);
            },
            () => {
              console.log("Unable to retrieve your location");
            }
          );
        }
        
        // Handle click events for location selection
        if (onLocationSelect) {
          map.current.on('click', async (e: any) => {
            const { lng, lat } = e.lngLat;
            
            // Get address from coordinates using Mapbox Geocoding API
            try {
              const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
              );
              const data = await response.json();
              const address = data.features[0]?.place_name || 'Unknown location';
              
              onLocationSelect({ lat, lng, address });
            } catch (error) {
              console.error('Error getting address:', error);
              onLocationSelect({ lat, lng, address: 'Location selected' });
            }
          });
        }
      });
      
      // Clean up on unmount
      return () => map.current?.remove();
    };
    
    initializeMap();
  }, [onLocationSelect]);
  
  return (
    <div className={cn("h-full w-full rounded-md overflow-hidden", className)}>
      <div ref={mapContainer} className="map-container" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-primary animate-pulse">Loading map...</div>
        </div>
      )}
    </div>
  );
};

export default Map;
