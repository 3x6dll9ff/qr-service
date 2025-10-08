import { QrCode } from 'lucide-react';

interface LoadingScreenProps {
  language: 'ru' | 'en' | 'me';
}

export function LoadingScreen({ language }: LoadingScreenProps) {
  const messages = {
    ru: {
      title: 'QR Service',
      subtitle: 'Загрузка приложения...'
    },
    en: {
      title: 'QR Service',
      subtitle: 'Loading application...'
    },
    me: {
      title: 'QR Service',
      subtitle: 'Učitavanje aplikacije...'
    }
  };

  const t = messages[language];

  return (
    <div className="min-h-screen max-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center text-white">
        <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
          <QrCode className="w-10 h-10 text-white animate-pulse" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">
          {t.title}
        </h1>
        
        <p className="text-white/80">
          {t.subtitle}
        </p>
      </div>
    </div>
  );
}
