import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/card';

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

interface CategoryGridProps {
  categories: Category[];
  title: string;
}

export function CategoryGrid({ categories, title }: CategoryGridProps) {
  return (
    <Card className="relative overflow-hidden border-0 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 shadow-md px-4 py-4 gap-4">
      <h3 className="text-foreground text-base font-medium">{title}</h3>
      <div className="grid grid-cols-4 gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              className="flex flex-col items-center space-y-2 p-2.5 rounded-xl hover:bg-accent/50 transition-all active:scale-95 group"
            >
              <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200`}>
                <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
              </div>
              <span className="text-[10px] text-center text-foreground leading-tight break-words w-full font-medium group-hover:text-primary transition-colors duration-200">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

