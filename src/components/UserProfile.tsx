
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface UserProfileProps {
  className?: string;
  onClose?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ className, onClose }) => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    rating: 4.85,
    memberSince: 'January 2020',
    trips: 153,
  };

  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '5555', isDefault: false },
  ];

  const addresses = [
    { id: 1, name: 'Home', address: '123 Main St, Anytown, CA 94105' },
    { id: 2, name: 'Work', address: '456 Market St, Anytown, CA 94107' },
  ];

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-uber-primary text-white pb-12 relative">
        <CardTitle className="text-xl">Profile</CardTitle>
        <CardDescription className="text-white/80">Manage your account</CardDescription>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 text-white hover:bg-white/20"
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
      </CardHeader>

      <div className="flex justify-center -mt-10">
        <Avatar className="w-20 h-20 border-4 border-background">
          <AvatarImage src="" />
          <AvatarFallback className="text-xl bg-uber-secondary text-white">JD</AvatarFallback>
        </Avatar>
      </div>

      <CardContent className="pt-2 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mt-2">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="flex items-center justify-center mt-2 space-x-1">
            <span className="text-amber-500">★</span>
            <span className="font-medium">{user.rating}</span>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{user.trips}</p>
            <p className="text-sm text-muted-foreground">Trips</p>
          </div>
          <div>
            <p className="text-sm font-medium">Member since</p>
            <p className="text-sm">{user.memberSince}</p>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Payment Methods</h4>
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="mr-3">
                  {method.type === 'Visa' ? (
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs">VISA</div>
                  ) : (
                    <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs">MC</div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{method.type} •••• {method.last4}</p>
                </div>
              </div>
              {method.isDefault && <Badge variant="outline">Default</Badge>}
            </div>
          ))}
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Saved Addresses</h4>
          {addresses.map((addr) => (
            <div key={addr.id} className="py-2">
              <p className="text-sm font-medium">{addr.name}</p>
              <p className="text-sm text-muted-foreground">{addr.address}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
