import { MapPin, UtensilsCrossed, Car } from 'lucide-react';
import { Property, Attraction, Restaurant, Service, Language, Theme } from '../types';
import { translations } from '../lib/translations';
import { mockRecommendations } from '../lib/mockData';
import { SettingsMenu } from './SettingsMenu';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { WeatherWidget } from './dashboard/WeatherWidget';
import { WifiConnectionWidget } from './dashboard/WifiConnectionWidget';
import { HostContactWidget } from './dashboard/HostContactWidget';
import { CategoryGrid } from './dashboard/CategoryGrid';
import { RecommendationsList } from './dashboard/RecommendationsList';
import { PlacesList } from './dashboard/PlacesList';
import { useState, useRef, useEffect } from 'react';

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

export function Dashboard({
  property,
  attractions,
  restaurants,
  language,
  onLanguageChange,
  theme,
  onThemeChange,
}: DashboardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [weatherIndex, setWeatherIndex] = useState(0);
  const [lastManualSwipe, setLastManualSwipe] = useState<number>(0);
  const weatherCarouselRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const widgets = [
    { type: 'wifi' as const },
    { type: 'contact' as const },
    { type: 'weather' as const },
  ];

  // Auto-scroll weather carousel every 5 seconds (or 15 seconds after manual swipe)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceManualSwipe = now - lastManualSwipe;
      
      // If manual swipe was less than 15 seconds ago, skip auto-scroll
      if (lastManualSwipe > 0 && timeSinceManualSwipe < 15000) {
        return;
      }
      
      setWeatherIndex((prev) => (prev + 1) % widgets.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [widgets.length, lastManualSwipe]);

  // Swipe detection for weather carousel
  useEffect(() => {
    const el = weatherCarouselRef.current;
    if (!el) return;
    
    let startX = 0;
    let isDragging = false;
    
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };
    
    const onTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      // Minimum swipe distance (50px)
      if (Math.abs(diff) > 50) {
        // Mark manual swipe timestamp
        setLastManualSwipe(Date.now());
        
        if (diff > 0 && weatherIndex < widgets.length - 1) {
          // Swipe left - next
          setWeatherIndex(weatherIndex + 1);
        } else if (diff < 0 && weatherIndex > 0) {
          // Swipe right - previous
          setWeatherIndex(weatherIndex - 1);
        }
      }
      isDragging = false;
    };
    
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [weatherIndex, widgets.length]);

  const categories = [
    { id: 'attractions', name: t.attractions, icon: MapPin, color: 'bg-blue-500' },
    { id: 'restaurants', name: t.restaurants, icon: UtensilsCrossed, color: 'bg-orange-500' },
    { id: 'taxi', name: t.taxi, icon: Car, color: 'bg-green-500' },
    { id: 'tours', name: t.tours, icon: MapPin, color: 'bg-purple-500' },
  ];

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <DashboardHeader
        welcome={t.welcome}
        city={property.city}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      <SettingsMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        language={language}
        onLanguageChange={onLanguageChange}
        theme={theme}
        onThemeChange={onThemeChange}
        contactPhone={property.hostContact}
      />

      <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        {/* Weather Carousel */}
        <div
          ref={weatherCarouselRef}
          className="relative overflow-hidden"
        >
          <div 
            className="flex"
            style={{ 
              transform: `translateX(-${weatherIndex * 100}%)`,
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {widgets.map((widget, idx) => (
              <div key={idx} className="w-full flex-shrink-0">
                {widget.type === 'wifi' && (
                  <WifiConnectionWidget
                    ssid="Guest WiFi"
                    password="welcome123"
                  />
                )}
                {widget.type === 'contact' && (
                  <HostContactWidget
                    hostName={property.hostName || "Владелец"}
                    phone={property.hostContact}
                    email={property.hostEmail}
                  />
                )}
                {widget.type === 'weather' && (
                  <WeatherWidget
                    city={property.city}
                    address={property.address}
                    weatherLabel={t.weather}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 py-2">
          {widgets.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: idx === weatherIndex ? '12px' : '10px',
                height: idx === weatherIndex ? '12px' : '10px',
                backgroundColor: idx === weatherIndex ? '#3B82F6' : '#9CA3AF',
                borderRadius: '50%',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-[100vw] px-3 space-y-6 pb-8">
          <CategoryGrid categories={categories} title={t.categories} />

          <RecommendationsList
            recommendations={mockRecommendations}
            title={t.recommendations}
            viewAllLabel={t.viewAll}
          />

          <PlacesList
            places={attractions}
            title={t.placesToWalk}
            icon={MapPin}
            viewAllLabel={t.viewAll}
            type="attraction"
          />

          <PlacesList
            places={restaurants}
            title={t.whereToEat}
            icon={UtensilsCrossed}
            iconColor="text-orange-600"
            viewAllLabel={t.viewAll}
            type="restaurant"
          />
        </div>
      </div>
    </div>
  );
}