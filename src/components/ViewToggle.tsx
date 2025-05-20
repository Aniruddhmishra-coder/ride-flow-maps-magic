
import React from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ViewToggleProps {
  isDriver: boolean;
  onToggle: (isDriver: boolean) => void;
  className?: string;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ isDriver, onToggle, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`bg-white rounded-full shadow-lg p-1.5 ${className}`}>
            <div className="flex items-center rounded-full overflow-hidden border">
              <Toggle
                pressed={!isDriver}
                onPressedChange={() => onToggle(false)}
                className={`px-4 py-2 rounded-none rounded-l-full data-[state=on]:bg-uber-primary data-[state=on]:text-white`}
              >
                Rider
              </Toggle>
              <Toggle
                pressed={isDriver}
                onPressedChange={() => onToggle(true)}
                className={`px-4 py-2 rounded-none rounded-r-full data-[state=on]:bg-uber-primary data-[state=on]:text-white`}
              >
                Driver
              </Toggle>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch between rider and driver mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ViewToggle;
