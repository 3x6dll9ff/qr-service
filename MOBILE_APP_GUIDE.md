# 📱 Mobile-First Web App Guide

## Архитектура мобильного приложения

### 🎯 Основные принципы

1. **Мобильная оптимизация**
   - Фиксированная ширина ~390px (типичный мобильный экран)
   - Touch-friendly интерфейс (минимум 44px для touch targets)
   - Плавные анимации 60fps
   - Safe area поддержка для iPhone

2. **Нативная навигация**
   - Bottom Tab Bar в стиле Telegram
   - Swipe жесты для карусели
   - Pull-to-refresh функциональность
   - Модальные окна с анимациями

3. **Производительность**
   - Lazy loading компонентов
   - Оптимизированные изображения
   - Service Worker для offline режима
   - Code splitting

## 🏗️ Структура компонентов

```
src/
├── components/
│   ├── MobileContainer.tsx      # Мобильные контейнеры
│   ├── BottomTabBar.tsx         # Навигация в стиле Telegram
│   ├── dashboard/               # Dashboard компоненты
│   └── ui/
│       └── mobile-modal.tsx     # Мобильные модальные окна
├── hooks/
│   ├── useMobileGestures.ts     # Жесты и анимации
│   ├── useIsMobile.ts          # Определение мобильных устройств
│   └── usePerformanceOptimization.ts
└── styles/
    └── globals.css             # Мобильные стили
```

## 🎨 UI/UX Паттерны

### Bottom Navigation
```tsx
// Темная панель в стиле Telegram
<div className="bg-gray-900 border-t border-gray-700 px-6 py-3">
  <Button className="flex flex-col items-center gap-1">
    <Phone className="w-6 h-6 text-gray-300" />
    <span className="text-xs text-gray-300">Позвонить</span>
  </Button>
</div>
```

### Мобильные жесты
```tsx
const gestureRef = useMobileGestures({
  onSwipeLeft: () => nextSlide(),
  onSwipeRight: () => prevSlide(),
  onPullToRefresh: () => refreshData(),
  onLongPress: () => showContextMenu(),
});
```

### Анимации
```tsx
const { slideInFromBottom, bounce, fadeIn } = useMobileAnimations();

// Плавные переходы
slideInFromBottom(300);
bounce(400);
```

## 📱 Мобильные компоненты

### MobileContainer
```tsx
<MobileContainer>
  <MobileContent>
    {/* Контент с автоматическим отступом для bottom tab bar */}
  </MobileContent>
</MobileContainer>
```

### MobileCard
```tsx
<MobileCard onClick={handleClick}>
  <h3>Заголовок</h3>
  <p>Описание</p>
</MobileCard>
```

### MobileButton
```tsx
<MobileButton variant="primary" onClick={handleAction}>
  Действие
</MobileButton>
```

## 🚀 Оптимизация производительности

### Lazy Loading
```tsx
const Dashboard = lazy(() => import('./components/Dashboard'));

<Suspense fallback={<LoadingScreen />}>
  <Dashboard />
</Suspense>
```

### Service Worker
- Кеширование статических ресурсов
- Offline поддержка
- Background sync
- Push уведомления

### Изображения
```tsx
<ImageWithFallback
  src={imageUrl}
  alt="Описание"
  priority={false}
  sizes="100vw"
  placeholder="/placeholder.jpg"
/>
```

## 🎯 Touch Targets

Все интерактивные элементы должны быть минимум 44px:

```css
button, a, [role="button"] {
  min-height: 44px;
  min-width: 44px;
  touch-action: manipulation;
}
```

## 📐 Responsive Design

### Мобильная ширина
```css
/* Фиксированная ширина для мобильных */
@media (min-width: 768px) {
  body {
    max-width: 430px;
    margin: 0 auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
}
```

### Safe Area
```css
/* Поддержка iPhone safe area */
padding-bottom: calc(env(safe-area-inset-bottom) + 80px);
```

## 🎨 Анимации и переходы

### CSS Transitions
```css
.transition-mobile {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slide-up {
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Web Animations API
```tsx
element.animate([
  { transform: 'translateY(100%)', opacity: 0 },
  { transform: 'translateY(0)', opacity: 1 }
], {
  duration: 300,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  fill: 'forwards'
});
```

## 🔧 PWA Функции

### Манифест
```json
{
  "name": "QR Service - Guest Portal",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#0066FF",
  "background_color": "#fafafa"
}
```

### Meta теги
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
```

## 📊 Lighthouse Цели

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+
- **PWA**: 100

## 🎯 Мобильные UX Советы

1. **Навигация**
   - Используйте bottom navigation для основных разделов
   - Добавьте swipe жесты для карусели
   - Реализуйте pull-to-refresh

2. **Анимации**
   - Плавные переходы между экранами
   - Bounce эффекты для кнопок
   - Fade in/out для модальных окон

3. **Touch Feedback**
   - Active states для всех кнопок
   - Haptic feedback (если доступно)
   - Визуальная обратная связь

4. **Производительность**
   - Lazy loading для тяжелых компонентов
   - Оптимизация изображений
   - Минимизация DOM операций

## 🚀 Готовность к продакшену

✅ **PWA готов** - можно устанавливать как приложение  
✅ **Мобильная оптимизация** - touch-friendly интерфейс  
✅ **Производительность** - lazy loading, кеширование  
✅ **Анимации** - плавные 60fps переходы  
✅ **Жесты** - swipe, tap, long press  
✅ **Safe area** - поддержка iPhone  
✅ **Desktop ограничения** - только мобильная версия  

Приложение готово к развертыванию и использованию как полноценное мобильное приложение! 🎉
