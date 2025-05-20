
import React, { useState, useEffect } from 'react';
import Map from '@/components/Map';
import RideForm from '@/components/RideForm';
import NavBar from '@/components/NavBar';
import UserProfile from '@/components/UserProfile';
import RideHistory from '@/components/RideHistory';
import ViewToggle from '@/components/ViewToggle';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  const [isDriver, setIsDriver] = useState(false);
  const [mapKey, setMapKey] = useState(0); // Force map refresh when needed
  const [activeView, setActiveView] = useState<'ride' | 'profile' | 'history'>('ride');
  
  // Location handling
  const [selectedLocation, setSelectedLocation] = useState<{
    type: 'pickup' | 'destination' | null;
    coords: { lat: number; lng: number; address: string } | null;
  }>({
    type: null,
    coords: null,
  });

  const handleLocationSelect = (type: 'pickup' | 'destination', coords: any) => {
    setSelectedLocation({ type, coords });
  };

  const handleMapLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    if (selectedLocation.type) {
      // Simulate API call with a small delay
      toast({
        title: "Location Selected",
        description: `${selectedLocation.type === 'pickup' ? 'Pickup' : 'Destination'}: ${location.address}`,
      });
      setSelectedLocation({ type: null, coords: null });
    }
  };

  const handleViewToggle = (driverMode: boolean) => {
    setIsDriver(driverMode);
    toast({
      title: driverMode ? "Driver Mode" : "Rider Mode",
      description: `You are now in ${driverMode ? "driver" : "rider"} mode.`,
    });
    // Refresh map when view mode changes
    setMapKey(prev => prev + 1);
  };

  const handleProfileClick = () => {
    setActiveView('profile');
  };

  const handleHistoryClick = () => {
    setActiveView('history');
  };

  const handleClosePanel = () => {
    setActiveView('ride');
  };

  // Driver mode specific data
  const driverInfo = {
    availableRides: [
      { id: 'req1', pickup: '123 Market St', destination: 'SF Airport', fare: '$32', distance: '2.5 miles' },
      { id: 'req2', pickup: '456 Mission St', destination: 'Oakland', fare: '$45', distance: '5.1 miles' },
    ]
  };

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Navigation */}
      <NavBar onProfileClick={handleProfileClick} onHistoryClick={handleHistoryClick} />
      
      {/* Main Content */}
      <div className="flex-1 pt-16 relative">
        {/* Map component */}
        <Map key={mapKey} onLocationSelect={handleMapLocationSelect} className="w-full h-full" />
        
        {/* Mode Toggle */}
        <ViewToggle 
          isDriver={isDriver}
          onToggle={handleViewToggle}
          className="absolute top-4 right-4 z-20"
        />
        
        {/* Main Panel - Different content based on active view */}
        <div className={`absolute ${isMobile ? 'bottom-0 left-0 right-0' : 'top-4 left-4 max-w-md'} z-10`}>
          {activeView === 'ride' && (
            <>
              {!isDriver ? (
                <RideForm 
                  onLocationSelect={handleLocationSelect}
                  className={`${isMobile ? 'rounded-b-none rounded-t-xl' : 'rounded-xl'} overflow-hidden animate-slide-in`}
                />
              ) : (
                <div className={`bg-white p-4 shadow-lg ${isMobile ? 'rounded-t-xl' : 'rounded-xl'} animate-slide-in`}>
                  <h2 className="text-lg font-semibold mb-2">Driver Mode</h2>
                  <p className="text-sm text-muted-foreground mb-4">Available ride requests nearby</p>
                  
                  {driverInfo.availableRides.map(ride => (
                    <div key={ride.id} className="mb-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{ride.fare}</span>
                        <span className="text-sm text-muted-foreground">{ride.distance}</span>
                      </div>
                      <div className="flex">
                        <div className="mr-2 flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-uber-success"></div>
                          <div className="w-0.5 h-6 bg-gray-300"></div>
                          <div className="w-2 h-2 rounded-full bg-uber-primary"></div>
                        </div>
                        <div className="text-sm">
                          <p>{ride.pickup}</p>
                          <p>{ride.destination}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          
          {activeView === 'profile' && (
            <UserProfile 
              onClose={handleClosePanel}
              className={`${isMobile ? 'rounded-t-xl' : 'rounded-xl'} overflow-hidden animate-fade-in`}
            />
          )}
          
          {activeView === 'history' && (
            <RideHistory 
              onClose={handleClosePanel}
              className={`${isMobile ? 'rounded-t-xl' : 'rounded-xl'} overflow-hidden animate-fade-in`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
