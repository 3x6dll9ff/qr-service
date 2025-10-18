import { createPortal } from 'react-dom';
import { BottomTabBar, BottomTabBarProps } from './BottomTabBar';

export function BottomTabBarPortal(props: BottomTabBarProps) {
  // Рендерим напрямую в body для гарантированной видимости
  // Portal обходит все родительские контейнеры с overflow, transform, и т.д.
  if (typeof document === 'undefined') return null;
  
  return createPortal(<BottomTabBar {...props} />, document.body);
}
