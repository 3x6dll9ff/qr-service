import { Sun, MapPin, Droplets, Wind } from 'lucide-react';
import { Card } from '../ui/card';

interface WeatherWidgetProps {
  city: string;
  address: string;
  weatherLabel: string;
}

export function WeatherWidget({ city, address, weatherLabel }: WeatherWidgetProps) {
  return (
    <div className="px-3 py-4 h-full">
      <Card className="relative overflow-hidden border-0 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md px-4 py-4 gap-4 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white/90 text-base font-medium">
            <span className="text-base">☀️</span>
            <p>Sunčano</p>
          </div>
          <p className="text-white/70 text-base font-medium uppercase tracking-[0.08em]">{city}</p>
        </div>

        {/* Main */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-2">
              <span className="font-semibold" style={{ fontSize: '64px', lineHeight: 0.9 }}>24°</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-white/10 rounded-xl px-3 py-2 backdrop-blur-sm space-y-2 text-right">
              <div className="flex items-center justify-end gap-2 text-xs text-white/80">
                <Droplets className="w-3.5 h-3.5" />
                <span>42%</span>
              </div>
              <div className="flex items-center justify-end gap-2 text-xs text-white/80">
                <Wind className="w-3.5 h-3.5" />
                <span>3 м/с</span>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { d: 'Пн', t: '22°', e: '☀️' },
            { d: 'Вт', t: '23°', e: '⛅️' },
            { d: 'Ср', t: '21°', e: '🌤️' },
            { d: 'Чт', t: '20°', e: '🌦️' },
          ].map((it) => (
            <div key={it.d} className="bg-white/10 rounded-lg px-2.5 py-2 text-center shadow-sm">
              <div className="text-[11px] text-white/90 font-medium uppercase tracking-[0.08em]">{it.d}</div>
              <div className="text-lg leading-none mt-1">{it.e}</div>
              <div className="text-[11px] text-white/90 mt-1 font-medium">{it.t}</div>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="bg-white/10 rounded-lg px-2.5 py-2 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-1.5 text-white/80 text-xs">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{address}, {city}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

