import { LucideIcon, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface Place {
  id: string;
  name: string;
  description?: string;
  cuisine?: string;
  image: string;
  distance: string;
}

interface PlacesListProps {
  places: Place[];
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  viewAllLabel: string;
  type: 'attraction' | 'restaurant';
}

export function PlacesList({ places, title, icon: Icon, iconColor, viewAllLabel, type }: PlacesListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <Icon className={`w-4 h-4 flex-shrink-0 ${iconColor || 'text-primary'}`} />
          <h3 className="text-foreground text-sm font-medium truncate">{title}</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-primary h-7 px-2 text-[10px] flex-shrink-0 font-medium">
          {viewAllLabel}
          <ChevronRight className="w-3 h-3 ml-0.5" />
        </Button>
      </div>
      <div
        className="overflow-x-auto overflow-y-hidden w-full max-w-[100vw]"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x', overscrollBehaviorX: 'contain' }}
      >
        <div className="inline-flex gap-3 pb-1">
          {places.map((place) => (
            <Card
              key={place.id}
              className="flex-none w-[144px] h-[180px] box-border p-0 overflow-hidden hover:shadow-md transition-all active:scale-95 cursor-pointer rounded-lg gap-0"
            >
              <div className="relative h-24 bg-muted overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground border-0 text-[9px] px-2 py-0.5 font-medium rounded-md shadow-sm">
                  {place.distance}
                </Badge>
              </div>
              <div className="p-3 flex flex-col justify-center gap-1">
                <h4 className="line-clamp-2 text-[11px] font-semibold leading-tight">{place.name}</h4>
                <p className="text-muted-foreground line-clamp-2 text-[9px] leading-tight">
                  {type === 'restaurant' ? place.cuisine : place.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

