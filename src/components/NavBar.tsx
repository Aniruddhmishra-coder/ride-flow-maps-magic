
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface NavBarProps {
  onProfileClick?: () => void;
  onHistoryClick?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onProfileClick, onHistoryClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleProfileClick = () => {
    setIsOpen(false);
    if (onProfileClick) onProfileClick();
  };

  const handleHistoryClick = () => {
    setIsOpen(false);
    if (onHistoryClick) onHistoryClick();
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', action: handleProfileClick },
    { id: 'history', label: 'Ride History', action: handleHistoryClick },
    { id: 'payment', label: 'Payment Methods', action: () => {} },
    { id: 'settings', label: 'Settings', action: () => {} },
    { id: 'help', label: 'Help', action: () => {} },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-uber-primary">UBER</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
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
                  className="feather feather-menu"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  <div className="flex items-center space-x-3 mb-6 mt-4">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-uber-primary text-white">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
              <Separator className="my-4" />
              <div className="grid gap-4 py-4">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="justify-start text-left"
                    onClick={item.action}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.slice(0, 3).map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="text-sm"
                onClick={item.action}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Profile Icon (Desktop) */}
          <Avatar onClick={handleProfileClick} className="cursor-pointer hidden md:flex">
            <AvatarImage src="" />
            <AvatarFallback className="bg-uber-primary text-white">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
