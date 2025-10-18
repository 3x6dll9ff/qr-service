import { useEffect, useCallback, useRef } from 'react';

interface PerformanceOptimizationOptions {
  enableVirtualScrolling?: boolean;
  enableImageLazyLoading?: boolean;
  enablePreloading?: boolean;
  enableServiceWorker?: boolean;
}

export function usePerformanceOptimization(options: PerformanceOptimizationOptions = {}) {
  const {
    enableVirtualScrolling = true,
    enableImageLazyLoading = true,
    enablePreloading = true,
    enableServiceWorker = true,
  } = options;

  const preloadQueue = useRef<Set<string>>(new Set());
  const intersectionObserver = useRef<IntersectionObserver | null>(null);

  // Оптимизация скролла
  const optimizeScroll = useCallback(() => {
    if (!enableVirtualScrolling) return;

    // Добавляем passive listeners для лучшей производительности
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (type === 'scroll' || type === 'touchmove' || type === 'wheel') {
        options = { passive: true, ...options };
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
  }, [enableVirtualScrolling]);

  // Предзагрузка критических ресурсов
  const preloadCriticalResources = useCallback(() => {
    if (!enablePreloading) return;

    const criticalResources = [
      '/src/components/Dashboard.tsx',
      '/src/components/LoadingScreen.tsx',
      '/src/components/BottomTabBar.tsx',
    ];

    criticalResources.forEach((resource) => {
      if (!preloadQueue.current.has(resource)) {
        preloadQueue.current.add(resource);
        // Здесь можно добавить логику предзагрузки модулей
        console.log(`Preloading: ${resource}`);
      }
    });
  }, [enablePreloading]);

  // Оптимизация изображений
  const optimizeImages = useCallback(() => {
    if (!enableImageLazyLoading) return;

    if (!intersectionObserver.current) {
      intersectionObserver.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                intersectionObserver.current?.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.1,
        }
      );
    }

    // Наблюдаем за всеми изображениями с data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => {
      intersectionObserver.current?.observe(img);
    });
  }, [enableImageLazyLoading]);

  // Оптимизация памяти
  const optimizeMemory = useCallback(() => {
    // Очистка неиспользуемых кешей
    if ('caches' in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          if (cacheName.includes('old-') || cacheName.includes('temp-')) {
            caches.delete(cacheName);
          }
        });
      });
    }

    // Принудительная сборка мусора (если доступна)
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc();
    }
  }, []);

  // Оптимизация анимаций
  const optimizeAnimations = useCallback(() => {
    // Проверяем поддержку prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--animation-iteration-count', '1');
    }

    // Оптимизируем CSS transitions для мобильных устройств
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-perspective: 1000;
        perspective: 1000;
      }
      
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Оптимизация сети
  const optimizeNetwork = useCallback(() => {
    // Предзагрузка DNS для внешних доменов
    const externalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://wa.me',
      'https://api.openweathermap.org',
    ];

    externalDomains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }, []);

  // Инициализация оптимизаций
  useEffect(() => {
    optimizeScroll();
    preloadCriticalResources();
    optimizeImages();
    optimizeMemory();
    optimizeAnimations();
    optimizeNetwork();

    // Периодическая очистка памяти
    const memoryCleanupInterval = setInterval(optimizeMemory, 30000); // каждые 30 секунд

    return () => {
      clearInterval(memoryCleanupInterval);
      intersectionObserver.current?.disconnect();
    };
  }, [
    optimizeScroll,
    preloadCriticalResources,
    optimizeImages,
    optimizeMemory,
    optimizeAnimations,
    optimizeNetwork,
  ]);

  // Функция для ручной оптимизации
  const forceOptimization = useCallback(() => {
    optimizeMemory();
    optimizeImages();
  }, [optimizeMemory, optimizeImages]);

  return {
    forceOptimization,
    preloadQueue: preloadQueue.current,
  };
}
