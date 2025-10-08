# Структура проекта

```
src/
├── components/              # Все React компоненты
│   ├── dashboard/          # Компоненты главной страницы
│   │   ├── WeatherWidget.tsx      # Виджет погоды с температурой
│   │   ├── CategoryGrid.tsx       # Сетка категорий (достопримечательности, рестораны)
│   │   ├── RecommendationsList.tsx # Горизонтальный список рекомендаций
│   │   ├── PlacesList.tsx         # Универсальный список мест
│   │   └── DashboardHeader.tsx    # Шапка главной страницы
│   │
│   ├── ui/                 # UI компоненты библиотеки (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── sheet.tsx
│   │   └── ... (другие UI компоненты)
│   │
│   ├── utils/              # Утилитные компоненты
│   │   └── ImageWithFallback.tsx  # Изображение с фолбэком
│   │
│   ├── Dashboard.tsx       # Главная страница (композиция dashboard компонентов)
│   ├── SettingsMenu.tsx    # Боковое меню настроек
│   ├── LoadingScreen.tsx   # Экран загрузки
│   └── DesktopBlock.tsx    # Блок для десктопов
│
├── hooks/                  # Кастомные React хуки
│   └── useIsMobile.ts      # Хук определения мобильного устройства
│
├── lib/                    # Библиотеки и утилиты
│   ├── translations.ts     # Переводы (ru/en/me)
│   └── mockData.ts         # Моковые данные
│
├── types/                  # TypeScript типы
│   └── index.ts            # Общие типы приложения
│
├── styles/                 # Стили
│   └── globals.css         # Глобальные стили и CSS переменные
│
├── App.tsx                 # Корневой компонент приложения
├── main.tsx               # Точка входа React приложения
└── index.css              # Базовые стили Tailwind

public/                     # Статические файлы
index.html                 # HTML шаблон
package.json               # Зависимости и скрипты
vite.config.ts             # Конфигурация Vite
wrangler.toml             # Конфигурация Cloudflare Pages
```

## Архитектура компонентов

### Dashboard (главная страница)
- **Dashboard.tsx** - композиция всех компонентов главной страницы
  - DashboardHeader - шапка с приветствием и кнопкой меню
  - WeatherWidget - виджет погоды (96px температура через inline-стили)
  - CategoryGrid - сетка категорий (4 колонки)
  - RecommendationsList - рекомендации (горизонтальный скролл)
  - PlacesList - аттракционы и рестораны (переиспользуемый компонент)

### Особенности
- **Модульная структура**: каждый компонент отвечает за свою часть UI
- **Переиспользуемость**: PlacesList используется для аттракционов и ресторанов
- **TypeScript**: строгая типизация всех пропсов
- **Inline-стили**: температура (96px) использует inline-стили для обхода ограничений Tailwind

