import { MapPin, UtensilsCrossed, Car, ChevronRight, Menu } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Property, Attraction, Restaurant, Service, Language, Theme } from '../types';
import { translations } from '../lib/translations';
import { mockRecommendations } from '../lib/mockData';
import { SettingsMenu } from './SettingsMenu';
import { useState } from 'react';

interface DashboardProps {
  property: Property;
  attractions: Attraction[];
  restaurants: Restaurant[];
  services: Service[];
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const categoryIcons: Record<string, any> = {
  attractions: MapPin,
  restaurants: UtensilsCrossed,
  taxi: Car,
  tours: MapPin,
};

export function Dashboard({
  property,
  attractions,
  restaurants,
  services,
  language,
  onLanguageChange,
  theme,
  onThemeChange,
}: DashboardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];

  const categories = [
    {
      id: 'attractions',
      name: t.attractions,
      icon: MapPin,
      color: 'bg-blue-500',
    },
    {
      id: 'restaurants',
      name: t.restaurants,
      icon: UtensilsCrossed,
      color: 'bg-orange-500',
    },
    {
      id: 'taxi',
      name: t.taxi,
      icon: Car,
      color: 'bg-green-500',
    },
    {
      id: 'tours',
      name: t.tours,
      icon: MapPin,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header - Приветствие + бургер меню */}
      <div className="bg-card border-b border-border flex-shrink-0 z-10">
        <div className="w-full px-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-sm">{t.welcome}</p>
              <h2 className="text-primary text-lg truncate">{property.city}</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(true)}
              className="hover:bg-accent h-10 w-10 p-0 flex-shrink-0"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Menu */}
      <SettingsMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        language={language}
        onLanguageChange={onLanguageChange}
        theme={theme}
        onThemeChange={onThemeChange}
        contactPhone={property.hostContact}
      />

      <ScrollArea className="flex-1 overflow-hidden">
        <div className="w-full px-3 py-4 space-y-5 pb-6">
          {/* Weather Widget */}
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 border-0 rounded-xl">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-white/80 text-xs font-medium">Погода</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-2xl">☀️</span>
                  <span className="text-xl font-medium">24°C</span>
                </div>
                <p className="text-white/80 mt-1 text-xs">Podgorica</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-white/80 text-xs font-medium">Sunčano</p>
                <p className="text-white/80 text-xs mt-1">💧 42%</p>
              </div>
            </div>
          </Card>

          {/* Блок с категориями */}
          <div className="space-y-3">
            <h3 className="text-foreground text-base font-medium">{t.categories}</h3>
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
                    <span className="text-[10px] text-center text-foreground leading-tight break-words w-full font-medium group-hover:text-primary transition-colors duration-200">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Блок с рекомендациями */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-foreground text-base font-medium">{t.recommendations}</h3>
              <Button variant="ghost" size="sm" className="text-primary h-7 px-2 text-xs font-medium">
                {t.viewAll}
              </Button>
            </div>
            <div className="overflow-x-auto overflow-y-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="flex space-x-3 pb-1">
                {mockRecommendations.map((rec) => (
                  <Card
                    key={rec.id}
                    className="flex-shrink-0 w-36 p-0 overflow-hidden hover:shadow-md transition-all active:scale-95 cursor-pointer rounded-lg"
                  >
                    <div className="relative h-20 bg-muted overflow-hidden">
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
                    <div className="p-2.5">
                      <h4 className="line-clamp-1 text-xs font-medium">{rec.name}</h4>
                      <p className="text-muted-foreground line-clamp-1 text-[10px] mt-0.5">{rec.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Куда можно прогуляться - Достопримечательности */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <h3 className="text-foreground text-sm font-medium truncate">{t.placesToWalk}</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-primary h-7 px-2 text-[10px] flex-shrink-0 font-medium">
                {t.viewAll}
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </Button>
            </div>
            <div className="overflow-x-auto overflow-y-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="flex space-x-3 pb-1">
                {attractions.map((attraction) => (
                  <Card
                    key={attraction.id}
                    className="flex-shrink-0 w-36 p-0 overflow-hidden hover:shadow-md transition-all active:scale-95 cursor-pointer rounded-lg"
                  >
                    <div className="relative h-20 bg-muted overflow-hidden">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground border-0 text-[9px] px-2 py-0.5 font-medium rounded-md shadow-sm">
                        {attraction.distance}
                      </Badge>
                    </div>
                    <div className="p-2.5">
                      <h4 className="line-clamp-1 text-xs font-medium">{attraction.name}</h4>
                      <p className="text-muted-foreground line-clamp-1 text-[10px] mt-0.5">{attraction.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Где можно поесть - Рестораны */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <UtensilsCrossed className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <h3 className="text-foreground text-sm font-medium truncate">{t.whereToEat}</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-primary h-7 px-2 text-[10px] flex-shrink-0 font-medium">
                {t.viewAll}
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </Button>
            </div>
            <div className="overflow-x-auto overflow-y-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="flex space-x-3 pb-1">
                {restaurants.map((restaurant) => (
                  <Card
                    key={restaurant.id}
                    className="flex-shrink-0 w-36 p-0 overflow-hidden hover:shadow-md transition-all active:scale-95 cursor-pointer rounded-lg"
                  >
                    <div className="relative h-20 bg-muted overflow-hidden">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground border-0 text-[9px] px-2 py-0.5 font-medium rounded-md shadow-sm">
                        {restaurant.distance}
                      </Badge>
                    </div>
                    <div className="p-2.5">
                      <h4 className="line-clamp-1 text-xs font-medium">{restaurant.name}</h4>
                      <p className="text-muted-foreground line-clamp-1 text-[10px] mt-0.5">{restaurant.cuisine}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}