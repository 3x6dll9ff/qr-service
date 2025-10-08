import { Wifi, Signal, Copy, User } from 'lucide-react';
import { Card } from '../ui/card';

interface WifiConnectionWidgetProps {
  ssid: string;
  password: string;
}

export function WifiConnectionWidget({ ssid, password }: WifiConnectionWidgetProps) {
  return (
    <div className="px-3 py-4 h-full">
      <Card 
        className="relative overflow-hidden border-0 rounded-2xl text-white shadow-md px-4 py-4 gap-4 h-full flex flex-col"
        style={{ background: 'linear-gradient(to bottom right, #a855f7, #9333ea)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white/90 text-base font-medium">
            <Wifi className="w-4 h-4" />
            <p>Wi-Fi</p>
          </div>
          <Signal className="w-5 h-5 text-white/70" />
        </div>

        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          {/* Info badge (moved here) */}
          <div className="text-center">
            <div className="bg-white/10 rounded-lg px-2.5 py-2 backdrop-blur-sm inline-block">
              <div className="flex items-center justify-center gap-1.5 text-white/80 text-xs">
                <Wifi className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">Подключитесь для доступа в интернет</span>
              </div>
            </div>
          </div>

          {/* Credentials blocks */}
          <div className="flex flex-col gap-2 mt-2">
            {/* SSID */}
            <div className="text-white/90 text-xs font-medium uppercase tracking-[0.08em] flex items-center gap-1.5">
              <User className="w-3 h-3" /> Name
            </div>
            <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
              <div className="text-white text-sm font-semibold truncate">
                {ssid}
              </div>
            </div>

            {/* Password */}
            <div className="text-white/90 text-xs font-medium uppercase tracking-[0.08em] flex items-center gap-1.5">
              <span className="text-[12px] leading-none">🔒</span> Pass
            </div>
            <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-1.5">
                <div className="text-white text-sm font-semibold font-mono truncate">
                  {password}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(password)}
                  className="flex-shrink-0 bg-white/15 hover:bg-white/25 active:scale-95 rounded-md p-1 transition-all"
                  aria-label="Скопировать пароль"
                >
                  <Copy className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Info */}
        <div className="bg-white/10 rounded-lg px-2.5 py-2 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-1.5 text-white/80 text-xs">
            <Wifi className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">Подключитесь для доступа в интернет</span>
          </div>
        </div>

      </Card>
    </div>
  );
}

