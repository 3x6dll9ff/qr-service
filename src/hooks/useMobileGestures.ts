import { useRef, useCallback, useEffect } from 'react';

interface MobileGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPullToRefresh?: () => void;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
  threshold?: number;
  longPressDelay?: number;
  doubleTapDelay?: number;
  pullToRefreshThreshold?: number;
}

export function useMobileGestures(options: MobileGestureOptions = {}) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPullToRefresh,
    onLongPress,
    onDoubleTap,
    threshold = 50,
    longPressDelay = 500,
    doubleTapDelay = 300,
    pullToRefreshThreshold = 100,
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<number>(0);
  const pullStartRef = useRef<number>(0);

  // Обработка начала касания
  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    // Pull to refresh - проверяем, находимся ли мы в самом верху
    if (onPullToRefresh && window.scrollY === 0) {
      pullStartRef.current = touch.clientY;
    }

    // Начинаем таймер для long press
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        onLongPress();
      }, longPressDelay);
    }
  }, [onLongPress, longPressDelay, onPullToRefresh]);

  // Обработка движения касания
  const handleTouchMove = useCallback((e: TouchEvent) => {
    // Отменяем long press если пользователь двигает палец
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Pull to refresh
    if (onPullToRefresh && pullStartRef.current > 0) {
      const currentY = e.touches[0].clientY;
      const pullDistance = currentY - pullStartRef.current;
      
      if (pullDistance > pullToRefreshThreshold) {
        // Показываем индикатор pull to refresh
        document.body.style.transform = `translateY(${Math.min(pullDistance * 0.5, 100)}px)`;
      }
    }
  }, [onLongPress, onPullToRefresh, pullToRefreshThreshold]);

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

    // Pull to refresh
    if (onPullToRefresh && pullStartRef.current > 0) {
      const pullDistance = touchEndRef.current.y - pullStartRef.current;
      document.body.style.transform = '';
      
      if (pullDistance > pullToRefreshThreshold) {
        onPullToRefresh();
      }
      pullStartRef.current = 0;
    }

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
      }

      lastTapRef.current = now;
    }

    // Сбрасываем состояние
    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPullToRefresh,
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

// Хук для мобильных анимаций с оптимизацией производительности
export function useMobileAnimations() {
  const elementRef = useRef<HTMLElement>(null);

  const slideInFromBottom = useCallback((duration = 300) => {
    const element = elementRef.current;
    if (!element) return;

    element.animate(
      [
        { transform: 'translateY(100%)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ],
      {
        duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards',
      }
    );
  }, []);

  const slideOutToBottom = useCallback((duration = 300) => {
    const element = elementRef.current;
    if (!element) return;

    return element.animate(
      [
        { transform: 'translateY(0)', opacity: 1 },
        { transform: 'translateY(100%)', opacity: 0 },
      ],
      {
        duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards',
      }
    );
  }, []);

  const fadeIn = useCallback((duration = 300) => {
    const element = elementRef.current;
    if (!element) return;

    element.animate(
      [
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' },
      ],
      {
        duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards',
      }
    );
  }, []);

  const bounce = useCallback((duration = 400) => {
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
    slideInFromBottom,
    slideOutToBottom,
    fadeIn,
    bounce,
  };
}
