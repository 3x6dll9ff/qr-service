import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface Recommendation {
  id: string;
  name: string;
  description: string;
  image: string;
  badge?: string;
}

interface RecommendationsListProps {
  recommendations: Recommendation[];
  title: string;
  viewAllLabel: string;
}

export function RecommendationsList({ recommendations, title, viewAllLabel }: RecommendationsListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground text-base font-medium">{title}</h3>
        <Button variant="ghost" size="sm" className="text-primary h-7 px-2 text-xs font-medium">
          {viewAllLabel}
        </Button>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {recommendations.slice(0, 3).map((rec) => (
          <Card
            key={rec.id}
            className="w-[160px] h-[200px] flex-shrink-0 box-border p-0 overflow-hidden hover:shadow-md transition-all active:scale-95 cursor-pointer rounded-lg gap-0"
          >
            <div className="relative h-28 bg-muted overflow-hidden">
              <img
                src={rec.image}
                alt={rec.name}
                className="w-full h-full object-cover"
              />
              {rec.badge && (
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground border-0 text-[9px] px-2 py-0.5 font-medium rounded-md shadow-sm">
                  {rec.badge}
                </Badge>
              )}
            </div>
            <div className="p-3 flex flex-col justify-center gap-1">
              <h4 className="line-clamp-2 text-[12px] font-semibold leading-tight">{rec.name}</h4>
              <p className="text-muted-foreground line-clamp-2 text-[10px] leading-tight">{rec.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

