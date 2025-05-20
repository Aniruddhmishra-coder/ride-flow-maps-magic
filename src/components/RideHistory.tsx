
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface RideHistoryProps {
  className?: string;
  onClose?: () => void;
}

interface RideType {
  id: string;
  date: string;
  time: string;
  pickup: string;
  destination: string;
  price: string;
  status: 'completed' | 'cancelled' | 'ongoing';
  driverName?: string;
  vehicleType: string;
}

const RideHistory: React.FC<RideHistoryProps> = ({ className, onClose }) => {
  // Mock ride history data
  const rides: RideType[] = [
    {
      id: 'ride-123',
      date: 'May 19, 2025',
      time: '14:30',
      pickup: '123 Market St, San Francisco',
      destination: 'SF International Airport',
      price: '$34.50',
      status: 'completed',
      driverName: 'Michael K.',
      vehicleType: 'UberX'
    },
    {
      id: 'ride-122',
      date: 'May 17, 2025',
      time: '09:15',
      pickup: 'SF International Airport',
      destination: '345 Powell St, San Francisco',
      price: '$39.25',
      status: 'completed',
      driverName: 'Sarah L.',
      vehicleType: 'UberXL'
    },
    {
      id: 'ride-121',
      date: 'May 14, 2025',
      time: '19:45',
      pickup: '42 Mission St, San Francisco',
      destination: '10 Market Plaza, San Francisco',
      price: '$12.75',
      status: 'completed',
      driverName: 'David W.',
      vehicleType: 'UberX'
    },
    {
      id: 'ride-120',
      date: 'May 10, 2025',
      time: '08:30',
      pickup: '123 Market St, San Francisco',
      destination: '987 Harrison St, San Francisco',
      price: '$18.50',
      status: 'cancelled',
      vehicleType: 'UberX'
    },
    {
      id: 'ride-119',
      date: 'May 5, 2025',
      time: '16:20',
      pickup: '50 California St, San Francisco',
      destination: 'Oracle Park, San Francisco',
      price: '$15.75',
      status: 'completed',
      driverName: 'Emma R.',
      vehicleType: 'UberX'
    },
  ];

  // Function to get status badge styling
  const getStatusStyle = (status: RideType['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-uber-success/10 text-uber-success';
      case 'cancelled':
        return 'bg-uber-danger/10 text-uber-danger';
      case 'ongoing':
        return 'bg-uber-warning/10 text-uber-warning';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-uber-primary text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Ride History</CardTitle>
            <CardDescription className="text-white/80">Your recent trips</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="p-4 space-y-4">
            {rides.map((ride) => (
              <div key={ride.id} className="space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{ride.date}</p>
                    <p className="text-sm text-muted-foreground">{ride.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{ride.price}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(ride.status)}`}>
                      {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-uber-success"></div>
                    <div className="w-0.5 h-10 bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-uber-primary"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{ride.pickup}</p>
                    <div className="h-6"></div>
                    <p className="text-sm">{ride.destination}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Driver: </span>
                    <span>{ride.driverName || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Vehicle: </span>
                    <span>{ride.vehicleType}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    Get Receipt
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    Report Issue
                  </Button>
                </div>
                
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RideHistory;
