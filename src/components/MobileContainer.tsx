import React, { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export function MobileContainer({ children, className = '' }: MobileContainerProps) {
  return (
    <div 
      className={`min-h-screen bg-background overflow-x-hidden ${className}`}
      style={{
        // Мобильная оптимизация
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'none',
        touchAction: 'pan-y',
        // Фиксированная ширина для мобильных устройств
        maxWidth: '100vw',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}

// Компонент для мобильного контента с safe area
export function MobileContent({ children, className = '' }: MobileContainerProps) {
  return (
    <div 
      className={`flex-1 overflow-y-auto ${className}`}
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        // Отступ для bottom tab bar: 76px (min-height) + 16px (дополнительный отступ) + safe-area
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 100px)',
      }}
    >
      {children}
    </div>
  );
}

// Компонент для мобильных карточек
export function MobileCard({ children, className = '', onClick }: MobileContainerProps & { onClick?: () => void }) {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 active:scale-[0.98] transition-transform ${className}`}
      onClick={onClick}
      style={{
        minHeight: '44px', // Минимальный touch target
        touchAction: 'manipulation',
      }}
    >
      {children}
    </div>
  );
}

// Компонент для мобильных кнопок
export function MobileButton({ 
  children, 
  className = '', 
  onClick,
  variant = 'primary' 
}: MobileContainerProps & { 
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  const baseClasses = 'rounded-xl font-medium transition-all duration-200 active:scale-95 touch-manipulation';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-50',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      style={{
        minHeight: '48px', // Минимальный touch target для кнопок
        minWidth: '48px',
        touchAction: 'manipulation',
      }}
    >
      {children}
    </button>
  );
}
