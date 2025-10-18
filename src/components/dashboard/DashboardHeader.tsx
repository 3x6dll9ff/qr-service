import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

interface DashboardHeaderProps {
  welcome: string;
  city: string;
  onMenuClick: () => void;
}

export function DashboardHeader({ welcome, city, onMenuClick }: DashboardHeaderProps) {
  return (
    <div className="bg-card border-b border-border flex-shrink-0 z-10">
      <div className="w-full px-3 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground text-sm mb-0.5">{welcome}</p>
            <h2 className="text-primary text-lg font-medium truncate">{city}</h2>
          </div>
          <Button
            variant="ghost"
            onClick={onMenuClick}
            className="hover:bg-accent flex-shrink-0"
            style={{ width: '37px', height: '37px', padding: '0' }}
          >
            <Menu style={{ width: '21px', height: '21px' }} />
          </Button>
        </div>
      </div>
    </div>
  );
}

