import { Phone, Mail, MessageCircle, User } from 'lucide-react';
import { Card } from '../ui/card';

interface HostContactWidgetProps {
  hostName: string;
  phone: string;
  email?: string;
}

export function HostContactWidget({ hostName, phone, email }: HostContactWidgetProps) {
  return (
    <div className="px-3 py-4 h-full">
      <Card 
        className="relative overflow-hidden border-0 rounded-2xl text-white shadow-md px-4 py-4 gap-4 h-full flex flex-col justify-between"
        style={{ background: 'linear-gradient(to bottom right, #22c55e, #16a34a)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white/90 text-base font-medium">
            <User className="w-4 h-4" />
            <p>Владелец</p>
          </div>
          <Phone className="w-5 h-5 text-white/70" />
        </div>

        {/* Main */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-2">
              <span className="font-semibold" style={{ fontSize: '64px', lineHeight: 0.9 }}>
                <User className="w-16 h-16" />
              </span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-white/10 rounded-xl px-3 py-2 backdrop-blur-sm space-y-2 text-right">
              <div className="flex items-center justify-end gap-2 text-xs text-white/80">
                <Phone className="w-3.5 h-3.5" />
                <span>Звонок</span>
              </div>
              <div className="flex items-center justify-end gap-2 text-xs text-white/80">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details - 4 blocks */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white/10 rounded-lg px-2.5 py-2 text-center shadow-sm">
            <div className="text-[11px] text-white/90 font-medium uppercase tracking-[0.08em]">Имя</div>
            <div className="text-lg leading-none mt-1">👤</div>
            <div className="text-[11px] text-white/90 mt-1 font-medium truncate">{hostName}</div>
          </div>
          <div className="bg-white/10 rounded-lg px-2.5 py-2 text-center shadow-sm">
            <div className="text-[11px] text-white/90 font-medium uppercase tracking-[0.08em]">Звонок</div>
            <div className="text-lg leading-none mt-1">📞</div>
            <div className="text-[11px] text-white/90 mt-1 font-medium">24/7</div>
          </div>
          <div className="bg-white/10 rounded-lg px-2.5 py-2 text-center shadow-sm">
            <div className="text-[11px] text-white/90 font-medium uppercase tracking-[0.08em]">SMS</div>
            <div className="text-lg leading-none mt-1">💬</div>
            <div className="text-[11px] text-white/90 mt-1 font-medium">Быстро</div>
          </div>
          <div className="bg-white/10 rounded-lg px-2.5 py-2 text-center shadow-sm">
            <div className="text-[11px] text-white/90 font-medium uppercase tracking-[0.08em]">Email</div>
            <div className="text-lg leading-none mt-1">✉️</div>
            <div className="text-[11px] text-white/90 mt-1 font-medium truncate">{email || '-'}</div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white/10 rounded-lg px-2.5 py-2 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-1.5 text-white/80 text-xs">
            <Phone className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{phone}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

