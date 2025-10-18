import { Phone, MessageCircle, Settings, LucideIcon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../lib/translations';
import { cn } from './ui/utils';
import { useState } from 'react';

export interface BottomTabBarProps {
  language: Language;
  phoneNumber: string;
  onSettingsClick?: () => void;
  showSettings?: boolean;
}

interface TabButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  ariaLabel: string;
}

function TabButton({ icon: Icon, label, onClick, ariaLabel }: TabButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    onClick();
    
    setTimeout(() => setIsProcessing(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={isProcessing}
      aria-label={ariaLabel}
      className={cn(
        // Layout - flex-1 ensures equal width for all buttons
        'flex-1 flex flex-col items-center justify-center',
        'gap-1.5 py-4',
        
        // Touch optimization
        'touch-manipulation select-none',
        
        // Smooth transitions
        'transition-all duration-200',
        
        // Disabled state
        'disabled:opacity-50 disabled:cursor-not-allowed',
        
        // Scale animation when pressed
        isPressed && 'scale-95'
      )}
    >
      {/* Icon - увеличен до 28px для лучшей видимости */}
      <Icon 
        className={cn(
          'w-7 h-7 transition-colors duration-200',
          isPressed 
            ? 'text-[#0066FF] dark:text-blue-400' 
            : 'text-gray-700 dark:text-gray-300'
        )} 
        strokeWidth={2}
      />
      
      {/* Label - увеличен до 13px */}
      <span 
        className={cn(
          'text-[13px] leading-tight font-medium transition-colors duration-200',
          isPressed 
            ? 'text-[#0066FF] dark:text-blue-400' 
            : 'text-gray-700 dark:text-gray-300'
        )}
      >
        {label}
      </span>
    </button>
  );
}

export function BottomTabBar({ language, phoneNumber, onSettingsClick, showSettings }: BottomTabBarProps) {
  const t = translations[language];

  const handleCall = () => {
    try {
      window.open(`tel:${phoneNumber}`, '_self');
    } catch (error) {
      console.error('Failed to initiate call:', error);
    }
  };

  const handleMessage = () => {
    try {
      const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
      const whatsappUrl = `https://wa.me/${cleanNumber}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Failed to open WhatsApp:', error);
    }
  };

  const handleSettings = () => {
    onSettingsClick?.();
  };

  const buttons = [
    {
      icon: MessageCircle,
      label: t.writeUs,
      onClick: handleMessage,
      ariaLabel: `${t.writeUs} ${phoneNumber}`,
    },
    {
      icon: Phone,
      label: t.callUs,
      onClick: handleCall,
      ariaLabel: `${t.callUs} ${phoneNumber}`,
    },
    ...(showSettings ? [{
      icon: Settings,
      label: t.settings,
      onClick: handleSettings,
      ariaLabel: t.settings,
    }] : []),
  ];

  return (
    <nav
      className={cn(
        // Fixed positioning at bottom - всегда видимый
        'fixed bottom-0 left-0 right-0',
        'w-full',
        
        // Z-index МАКСИМАЛЬНЫЙ для гарантированной видимости поверх всего
        'z-[9999]',
        
        // Чистый белый фон для контраста
        'bg-white dark:bg-gray-900',
        
        // Более заметная граница
        'border-t-2 border-gray-200 dark:border-gray-700',
        
        // Более выраженная тень для видимости
        'shadow-[0_-4px_16px_rgba(0,0,0,0.12)] dark:shadow-[0_-4px_16px_rgba(0,0,0,0.5)]',
        
        // Prevent text selection
        'select-none'
      )}
      style={{ 
        // Safe area support for devices with notches (iPhone X+)
        paddingBottom: 'max(env(safe-area-inset-bottom), 0px)',
        
        // КРИТИЧЕСКИЕ стили для гарантированной видимости
        position: 'fixed' as const,
        bottom: 0,
        left: 0,
        right: 0,
        
        // Создаем новый слой композитинга
        transform: 'translateZ(0)',
        willChange: 'transform',
        
        // Убедимся что не будет скрыт overflow родителя
        isolation: 'isolate' as const,
      }}
      aria-label="Bottom navigation"
      role="navigation"
    >
      {/* Container with max-width and centered, увеличенная высота */}
      <div 
        className={cn(
          // Responsive width: 100% with max-width 430px, centered
          'mx-auto w-full max-w-[430px]',
          
          // Flex layout for equal button spacing
          'flex items-stretch',
          
          // Увеличенная минимальная высота до 76px для лучшей видимости
          'min-h-[76px]'
        )}
      >
        {/* Render buttons - equally spaced by flex-1 */}
        {buttons.map((button, index) => (
          <TabButton
            key={index}
            icon={button.icon}
            label={button.label}
            onClick={button.onClick}
            ariaLabel={button.ariaLabel}
          />
        ))}
      </div>
    </nav>
  );
}
