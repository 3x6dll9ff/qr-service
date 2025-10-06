import { useState, useEffect } from 'react';
import { QRScanner } from './components/QRScanner';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Dashboard } from './components/Dashboard';
import { Toaster } from './components/ui/sonner';
import { mockProperty, mockAttractions, mockRestaurants, mockServices } from './lib/mockData';
import { Language, Theme } from './types';

type Screen = 'scanner' | 'welcome' | 'dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('scanner');
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('ru');
  const [theme, setTheme] = useState<Theme>('light');

  // Detect user's preferred language
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('en')) {
      setLanguage('en');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Add viewport meta tag for proper mobile rendering
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      );
    }
  }, []);

  const handleScanSuccess = (code: string) => {
    setScannedCode(code);
    setCurrentScreen('welcome');
  };

  const handleContinue = () => {
    setCurrentScreen('dashboard');
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="relative w-full h-screen bg-background">

      {currentScreen === 'scanner' && (
        <QRScanner onScanSuccess={handleScanSuccess} language={language} />
      )}

      {currentScreen === 'welcome' && (
        <WelcomeScreen
          property={mockProperty}
          onContinue={handleContinue}
          language={language}
        />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard
          property={mockProperty}
          attractions={mockAttractions}
          restaurants={mockRestaurants}
          services={mockServices}
          language={language}
          onLanguageChange={handleLanguageChange}
          theme={theme}
          onThemeChange={handleThemeChange}
        />
      )}

      <Toaster />
    </div>
  );
}
