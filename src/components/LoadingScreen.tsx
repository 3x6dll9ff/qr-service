import Lottie from 'lottie-react';
import loadingAnimation from '../assets/lottie/loading.json';

interface LoadingScreenProps {
  language: 'ru' | 'en' | 'me';
}

export function LoadingScreen({ language }: LoadingScreenProps) {
  const messages = {
    ru: {
      title: 'QR Service',
      subtitle: 'Приложение загружается',
      waitText: 'Подождите немного'
    },
    en: {
      title: 'QR Service',
      subtitle: 'Application is loading',
      waitText: 'Please wait a moment'
    },
    me: {
      title: 'QR Service',
      subtitle: 'Aplikacija se učitava',
      waitText: 'Sačekajte malo'
    }
  };

  const t = messages[language];

  return (
    <div className="min-h-screen max-h-screen bg-white flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center text-gray-900">
        <div className="w-32 h-32 mx-auto mb-2">
          <Lottie 
            animationData={loadingAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        <p className="text-gray-900 text-xl font-extrabold mb-2" style={{ fontWeight: '900' }}>
          {t.subtitle}
        </p>
        
        <p className="text-gray-900 font-bold">
          {t.waitText}
        </p>
      </div>
    </div>
  );
}
