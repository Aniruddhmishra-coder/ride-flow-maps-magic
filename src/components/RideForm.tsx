
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight } from 'lucide-react';

interface LocationCoords {
  lat: number;
  lng: number;
  address: string;
}

interface RideFormProps {
  onSubmit?: (data: RideFormData) => void;
  onLocationSelect?: (type: 'pickup' | 'destination', coords: LocationCoords) => void;
  className?: string;
}

interface RideFormData {
  pickup: LocationCoords | null;
  destination: LocationCoords | null;
  rideType: string;
  paymentMethod: string;
}

const RideForm: React.FC<RideFormProps> = ({ onSubmit, onLocationSelect, className }) => {
  const [formData, setFormData] = useState<RideFormData>({
    pickup: null,
    destination: null,
    rideType: 'UberX',
    paymentMethod: 'card',
  });

  const handleLocationSelect = (type: 'pickup' | 'destination') => {
    toast({
      title: "Select on map",
      description: `Click on the map to set your ${type} location`,
      duration: 3000
    });
    
    if (onLocationSelect) {
      onLocationSelect(type, formData[type] || { lat: 0, lng: 0, address: '' });
    }
  };

  const handleSubmit = () => {
    if (!formData.pickup || !formData.destination) {
      toast({
        title: "Incomplete ride details",
        description: "Please select both pickup and destination locations",
        variant: "destructive",
      });
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }

    toast({
      title: "Ride booked!",
      description: "Your ride has been booked successfully",
      duration: 3000
    });
  };

  // Ride type options with pricing
  const rideTypes = [
    { id: 'UberX', name: 'UberX', price: '$15-20', time: '4 min away' },
    { id: 'UberXL', name: 'UberXL', price: '$24-30', time: '8 min away' },
    { id: 'UberBlack', name: 'Uber Black', price: '$35-42', time: '10 min away' },
  ];

  // Payment methods
  const paymentMethods = [
    { id: 'card', name: 'Credit Card' },
    { id: 'cash', name: 'Cash' },
    { id: 'wallet', name: 'Uber Cash' },
  ];

  const setLocation = (type: 'pickup' | 'destination', location: LocationCoords) => {
    setFormData((prev) => ({
      ...prev,
      [type]: location,
    }));
  };

  return (
    <Card className={`shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle>Book a Ride</CardTitle>
        <CardDescription>Enter your pickup and destination locations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pickup">Pickup Location</Label>
          <div className="flex gap-2">
            <Input
              id="pickup"
              placeholder="Pickup location"
              value={formData.pickup?.address || ''}
              onChange={(e) => setLocation('pickup', { ...formData.pickup!, address: e.target.value })}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleLocationSelect('pickup')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <div className="flex gap-2">
            <Input
              id="destination"
              placeholder="Where to?"
              value={formData.destination?.address || ''}
              onChange={(e) => setLocation('destination', { ...formData.destination!, address: e.target.value })}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleLocationSelect('destination')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="ride-type">Ride Type</Label>
          <Select 
            value={formData.rideType}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, rideType: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select ride type" />
            </SelectTrigger>
            <SelectContent>
              {rideTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  <div className="flex justify-between w-full">
                    <span>{type.name}</span>
                    <span className="text-muted-foreground">{type.price}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment">Payment Method</Label>
          <Select 
            value={formData.paymentMethod}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem key={method.id} value={method.id}>
                  {method.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-uber-primary hover:bg-uber-primary/90"
        >
          Book Ride
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RideForm;
