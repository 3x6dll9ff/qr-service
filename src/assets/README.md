# Assets

Эта папка содержит все статические ресурсы приложения.

## Структура

- `images/` - изображения (фото, иллюстрации, логотипы)
- `icons/` - иконки (SVG, PNG)
- `data/` - статические данные (JSON файлы, конфигурации)

## Использование

```typescript
// Импорт изображений
import logo from '@/assets/images/logo.png';
import heroImage from '@/assets/images/hero.jpg';

// Импорт иконок
import { ReactComponent as MenuIcon } from '@/assets/icons/menu.svg';

// Импорт данных
import config from '@/assets/data/config.json';
```
