import { Smartphone, QrCode, Download, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DesktopBlockProps {
  language: 'ru' | 'en' | 'me';
}

export function DesktopBlock({ language }: DesktopBlockProps) {
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const messages = {
    ru: {
      title: 'Мобильное приложение',
      description: 'Это приложение оптимизировано для мобильных устройств',
      subtitle: 'Откройте на смартфоне или планшете для лучшего опыта',
      qrTitle: 'QR код для быстрого доступа',
      qrDescription: 'Отсканируйте QR код на мобильном устройстве',
      shareTitle: 'Поделиться ссылкой',
      shareDescription: 'Отправьте ссылку на мобильное устройство',
      button: 'Понятно',
      showQr: 'Показать QR код',
      shareLink: 'Поделиться ссылкой',
      downloadPwa: 'Установить как приложение'
    },
    en: {
      title: 'Mobile Application',
      description: 'This app is optimized for mobile devices',
      subtitle: 'Open on smartphone or tablet for the best experience',
      qrTitle: 'QR code for quick access',
      qrDescription: 'Scan the QR code on your mobile device',
      shareTitle: 'Share link',
      shareDescription: 'Send the link to your mobile device',
      button: 'Got it',
      showQr: 'Show QR code',
      shareLink: 'Share link',
      downloadPwa: 'Install as app'
    },
    me: {
      title: 'Mobilna aplikacija',
      description: 'Ova aplikacija je optimizovana za mobilne uređaje',
      subtitle: 'Otvorite na pametnom telefonu ili tabletu za najbolje iskustvo',
      qrTitle: 'QR kod za brzi pristup',
      qrDescription: 'Skenirajte QR kod na mobilnom uređaju',
      shareTitle: 'Podeli link',
      shareDescription: 'Pošaljite link na mobilni uređaj',
      button: 'Razumijem',
      showQr: 'Prikaži QR kod',
      shareLink: 'Podeli link',
      downloadPwa: 'Instaliraj kao aplikaciju'
    }
  };

  const t = messages[language];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.title,
          text: t.description,
          url: currentUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback для браузеров без поддержки Web Share API
      navigator.clipboard.writeText(currentUrl).then(() => {
        alert('Ссылка скопирована в буфер обмена');
      });
    }
  };

  const handleInstallPWA = () => {
    // Показываем инструкции по установке PWA
    alert('Для установки приложения:\n1. Откройте в Chrome/Safari\n2. Нажмите "Добавить на главный экран"\n3. Следуйте инструкциям');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center max-w-lg w-full px-6">
        {/* Анимированная иконка */}
        <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg animate-pulse">
          <Smartphone className="w-16 h-16 text-blue-600" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping opacity-20"></div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.title}
        </h1>
        
        <p className="text-xl text-gray-700 mb-2">
          {t.description}
        </p>
        
        <p className="text-lg text-gray-600 mb-12">
          {t.subtitle}
        </p>

        {/* QR код секция */}
        {qrCodeVisible && (
          <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t.qrTitle}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {t.qrDescription}
            </p>
            <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg mx-auto flex items-center justify-center">
              <QrCode className="w-32 h-32 text-gray-400" />
            </div>
          </div>
        )}

        {/* Кнопки действий */}
        <div className="space-y-4 mb-8">
          <button 
            onClick={() => setQrCodeVisible(!qrCodeVisible)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {qrCodeVisible ? 'Скрыть QR код' : t.showQr}
          </button>
          
          <button 
            onClick={handleShare}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            {t.shareLink}
          </button>
          
          <button 
            onClick={handleInstallPWA}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            {t.downloadPwa}
          </button>
        </div>
        
        <button 
          onClick={() => window.close()}
          className="bg-gray-600 hover:bg-gray-700 text-white px-10 py-3 rounded-xl text-lg font-medium transition-colors shadow-lg"
        >
          {t.button}
        </button>

        {/* Дополнительная информация */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Поддерживаемые браузеры: Chrome, Safari, Firefox, Edge</p>
          <p className="mt-1">Минимальная версия: iOS 11.3+, Android 5.0+</p>
        </div>
      </div>
    </div>
  );
}
