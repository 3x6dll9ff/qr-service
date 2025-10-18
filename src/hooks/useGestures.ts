import { useRef, useCallback, useEffect } from 'react';

interface GestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onTap?: () => void;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
  threshold?: number;
  longPressDelay?: number;
  doubleTapDelay?: number;
}

export function useGestures(options: GestureOptions = {}) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPinch,
    onTap,
    onLongPress,
    onDoubleTap,
    threshold = 50,
    longPressDelay = 500,
    doubleTapDelay = 300,
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<number>(0);
  const initialDistanceRef = useRef<number>(0);

  // Получение расстояния между двумя точками
  const getDistance = useCallback((touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  // Обработка начала касания
  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    // Начинаем таймер для long press
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        onLongPress();
      }, longPressDelay);
    }

    // Обработка pinch gesture
    if (e.touches.length === 2 && onPinch) {
      initialDistanceRef.current = getDistance(e.touches[0], e.touches[1]);
    }
  }, [onLongPress, longPressDelay, onPinch, getDistance]);

  // Обработка движения касания
  const handleTouchMove = useCallback((e: TouchEvent) => {
    // Отменяем long press если пользователь двигает палец
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Обработка pinch gesture
    if (e.touches.length === 2 && onPinch && initialDistanceRef.current > 0) {
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / initialDistanceRef.current;
      onPinch(scale);
    }
  }, [onLongPress, onPinch, getDistance]);

  // Обработка окончания касания
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    // Отменяем long press таймер
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    const deltaTime = touchEndRef.current.time - touchStartRef.current.time;

    // Проверяем на swipe жесты
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Горизонтальный swipe
      if (Math.abs(deltaX) > threshold && deltaTime < 300) {
        if (deltaX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      }
    } else {
      // Вертикальный swipe
      if (Math.abs(deltaY) > threshold && deltaTime < 300) {
        if (deltaY > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }
    }

    // Проверяем на tap жесты
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 200) {
      const now = Date.now();
      const timeSinceLastTap = now - lastTapRef.current;

      if (timeSinceLastTap < doubleTapDelay && onDoubleTap) {
        onDoubleTap();
      } else if (onTap) {
        onTap();
      }

      lastTapRef.current = now;
    }

    // Сбрасываем состояние
    touchStartRef.current = null;
    touchEndRef.current = null;
    initialDistanceRef.current = 0;
  }, [
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onDoubleTap,
    threshold,
    doubleTapDelay,
  ]);

  // Привязка обработчиков к элементу
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return elementRef;
}

// Хук для анимаций с использованием Web Animations API
export function useAnimation() {
  const elementRef = useRef<HTMLElement>(null);

  const fadeIn = useCallback((duration = 300) => {
    const element = elementRef.current;
    if (!element) return;

    element.animate(
      [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards',
      }
    );
  }, []);

  const fadeOut = useCallback((duration = 300) => {
    const element = elementRef.current;
    if (!element) return;

    return element.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-20px)' },
      ],
      {
        duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards',
      }
    );
  }, []);

  const slideInFromLeft = useCallback((duration = 300) => {
    const element = elementRef.current;
    if (!element) return;

    element.animate(
      [
        { transform: 'translateX(-100%)' },
        { transform: 'translateX(0)' },
      ],
      {
        duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards',
      }
    );
  }, []);

  const slideInFromRight = useCallback((duration = 300) => {
    const element = elementRef.current;
    if (!element) return;

    element.animate(
      [
        { transform: 'translateX(100%)' },
        { transform: 'translateX(0)' },
      ],
      {
        duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards',
      }
    );
  }, []);

  const scaleIn = useCallback((duration = 300) => {
    const element = elementRef.current;
    if (!element) return;

    element.animate(
      [
        { transform: 'scale(0.8)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      {
        duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards',
      }
    );
  }, []);

  const bounce = useCallback((duration = 600) => {
    const element = elementRef.current;
    if (!element) return;

    element.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(0.95)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' },
      ],
      {
        duration,
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        fill: 'forwards',
      }
    );
  }, []);

  return {
    elementRef,
    fadeIn,
    fadeOut,
    slideInFromLeft,
    slideInFromRight,
    scaleIn,
    bounce,
  };
}
