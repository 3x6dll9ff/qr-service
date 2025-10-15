import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Dashboard } from './components/Dashboard';
import { DesktopBlock } from './components/DesktopBlock';
import { Toaster } from './components/ui/sonner';
import { mockProperty, mockAttractions, mockRestaurants, mockServices } from './lib/mockData';
import { Language, Theme } from './types';
import { useIsMobile } from './hooks/useIsMobile';

type Screen = 'loading' | 'dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');
  const [language, setLanguage] = useState<Language>('ru');
  const [theme, setTheme] = useState<Theme>('light');
  const isMobile = useIsMobile();

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

  // Загрузка приложения
  useEffect(() => {
    const loadApp = async () => {
      try {
        // Имитация загрузки данных
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Здесь можно добавить реальную загрузку данных
        // await loadUserData();
        // await loadAppConfig();
        
        setCurrentScreen('dashboard');
      } catch (error) {
        console.error('Ошибка загрузки приложения:', error);
        // В случае ошибки все равно переходим на dashboard
        setCurrentScreen('dashboard');
      }
    };

    loadApp();
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  // Если не мобильное устройство, показываем блокировочный экран
  if (!isMobile) {
    return <DesktopBlock language={language} />;
  }

  return (
    <div className="relative w-full min-h-screen bg-background overflow-x-hidden">

      {currentScreen === 'loading' && (
        <LoadingScreen language={language} />
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
