import { Smartphone } from 'lucide-react';

interface DesktopBlockProps {
  language: 'ru' | 'en' | 'me';
}

export function DesktopBlock({ language }: DesktopBlockProps) {
  const messages = {
    ru: {
      title: 'Мобильное приложение',
      description: 'Откройте на смартфоне или планшете',
      button: 'Понятно'
    },
    en: {
      title: 'Mobile Application',
      description: 'Open on smartphone or tablet',
      button: 'Got it'
    },
    me: {
      title: 'Mobilna aplikacija',
      description: 'Otvorite na pametnom telefonu ili tabletu',
      button: 'Razumijem'
    }
  };

  const t = messages[language];

  return (
    <div className="min-h-screen max-h-screen bg-white flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center max-w-md w-full px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Smartphone className="w-12 h-12 text-gray-600" />
        </div>
        
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          {t.title}
        </h1>
        
        <p className="text-lg text-gray-600 mb-12">
          {t.description}
        </p>
        
        <button 
          onClick={() => window.close()}
          className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 rounded-lg text-lg font-medium transition-colors"
        >
          {t.button}
        </button>
      </div>
    </div>
  );
}
