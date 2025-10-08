import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Проверяем ширину экрана (мобильные и планшеты до 1024px)
      const isMobileWidth = window.innerWidth <= 1024;
      
      // Проверяем User Agent для мобильных и планшетов
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet/i.test(
        navigator.userAgent
      );
      
      // Проверяем touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Считаем устройство подходящим (мобильное/планшет) если:
      // 1. Ширина экрана <= 1024px ИЛИ
      // 2. Это мобильный/планшетный User Agent ИЛИ  
      // 3. Это touch устройство с шириной <= 1200px
      const mobile = isMobileWidth || isMobileUA || (isTouchDevice && window.innerWidth <= 1200);
      
      setIsMobile(mobile);
    };

    // Проверяем при монтировании
    checkIsMobile();

    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', checkIsMobile);

    // Очищаем слушатель при размонтировании
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
}
