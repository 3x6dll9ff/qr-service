import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Проверяем ширину экрана (мобильные и планшеты до 768px)
      const isMobileWidth = width <= 768;
      
      // Проверяем User Agent для мобильных устройств
      const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      // Проверяем планшеты отдельно
      const isTabletUA = /iPad|Tablet/i.test(navigator.userAgent);
      
      // Проверяем touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Проверяем ориентацию и соотношение сторон
      const isPortrait = height > width;
      const aspectRatio = width / height;
      
      // Считаем устройство мобильным если:
      // 1. Ширина экрана <= 768px ИЛИ
      // 2. Это мобильный User Agent ИЛИ
      // 3. Это touch устройство с шириной <= 768px ИЛИ
      // 4. Это планшет в портретной ориентации с шириной <= 1024px
      const mobile = isMobileWidth || 
                    isMobileUA || 
                    (isTouchDevice && width <= 768) ||
                    (isTabletUA && isPortrait && width <= 1024);
      
      // Для десктопа показываем ограниченную версию
      if (!mobile && width > 768) {
        console.log('Desktop detected - showing limited view');
      }
      
      setIsMobile(mobile);
    };

    // Проверяем при монтировании
    checkIsMobile();

    // Добавляем слушатель изменения размера окна с debounce
    let timeoutId: NodeJS.Timeout;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkIsMobile, 100);
    };

    window.addEventListener('resize', debouncedCheck);
    window.addEventListener('orientationchange', debouncedCheck);

    // Очищаем слушатели при размонтировании
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedCheck);
      window.removeEventListener('orientationchange', debouncedCheck);
    };
  }, []);

  return isMobile;
}
