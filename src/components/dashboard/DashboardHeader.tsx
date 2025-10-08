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
      <div className="w-full px-3 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground text-sm">{welcome}</p>
            <h2 className="text-primary text-lg truncate">{city}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="hover:bg-accent h-10 w-10 p-0 flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

