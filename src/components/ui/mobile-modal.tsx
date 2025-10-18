import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';
import { useAnimation } from '../../hooks/useGestures';

interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  className?: string;
}

export function MobileModal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnBackdrop = true,
  className = '',
}: MobileModalProps) {
  const { elementRef, slideInFromLeft, fadeOut } = useAnimation();
  const modalRef = useRef<HTMLDivElement>(null);

  // Обработка закрытия по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Анимация появления
  useEffect(() => {
    if (isOpen && elementRef.current) {
      slideInFromLeft(300);
    }
  }, [isOpen, slideInFromLeft]);

  // Обработка клика по backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Обработка закрытия с анимацией
  const handleClose = async () => {
    if (elementRef.current) {
      await fadeOut(200);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={handleBackdropClick}
    >
      <div
        ref={elementRef}
        className={`w-full max-w-md bg-white rounded-t-3xl shadow-2xl transform transition-all duration-300 ease-out ${className}`}
        style={{
          maxHeight: '90vh',
          marginBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Компонент для полноэкранных модальных окон
export function FullScreenModal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  className = '',
}: Omit<MobileModalProps, 'closeOnBackdrop'>) {
  const { elementRef, fadeIn, fadeOut } = useAnimation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (elementRef.current) {
        fadeIn(300);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, fadeIn]);

  const handleClose = async () => {
    if (elementRef.current) {
      await fadeOut(200);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-white"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div ref={elementRef} className={`h-full flex flex-col ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          {title && (
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          )}
          {showCloseButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}

// Компонент для bottom sheet
export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  className = '',
}: Omit<MobileModalProps, 'closeOnBackdrop'>) {
  const { elementRef, slideInFromLeft, fadeOut } = useAnimation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (elementRef.current) {
        slideInFromLeft(300);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, slideInFromLeft]);

  const handleClose = async () => {
    if (elementRef.current) {
      await fadeOut(200);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div
        ref={elementRef}
        className={`w-full bg-white rounded-t-3xl shadow-2xl transform transition-all duration-300 ease-out ${className}`}
        style={{
          maxHeight: '80vh',
          marginBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
