import { Property, Attraction, Restaurant, Service } from '../types';

export const mockProperty: Property = {
  id: 'apt-001',
  name: 'Lux Apartmani Centar',
  address: 'Bulevar Svetog Petra Cetinjskog 42',
  city: 'Podgorica',
  country: 'Montenegro',
  wifi: {
    ssid: 'Guest_WiFi_42',
    password: 'Welcome2024!',
  },
  location: {
    lat: 42.4304,
    lng: 19.2594,
  },
  checkIn: '2025-10-02',
  checkOut: '2025-10-05',
  hostContact: '+382 67 123 456',
};

export const mockAttractions: Attraction[] = [
  {
    id: 'attr-1',
    name: 'Hram Hristovog Vaskrsenja',
    description: 'Pravoslavni hram - moderna ikona arhitekture Podgorice',
    distance: '1.2 km',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1632670571306-120d101b1f7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb250ZW5lZ3JvJTIwY2h1cmNoJTIwY2F0aGVkcmFsfGVufDF8fHx8MTc1OTY5MDY3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Достопримечательность',
  },
  {
    id: 'attr-2',
    name: 'Stara Varoš',
    description: 'Istorijski centar sa autentičnom arhitekturom i tradicijom',
    distance: '800 m',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1648672693264-502a8a661864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb2Rnb3JpY2ElMjBNb250ZW5lZ3JvJTIwY2l0eXxlbnwxfHx8fDE3NTk2OTA2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Историческое место',
  },
  {
    id: 'attr-3',
    name: 'Millennium Bridge',
    description: 'Moderan most preko rijeke Morače - simbol novog doba',
    distance: '1.5 km',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1649340590630-1459fdd6a147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb250ZW5lZ3JvJTIwb2xkJTIwYnJpZGdlfGVufDF8fHx8MTc1OTY5MDY4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Архитектура',
  },
  {
    id: 'attr-4',
    name: 'Gorica Hill',
    description: 'Prirodno uzvišenje sa panoramskim pogledom na grad',
    distance: '2.3 km',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1686571543445-29a4ba95387a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb250ZW5lZ3JvJTIwbW91bnRhaW5zJTIwbmF0dXJlfGVufDF8fHx8MTc1OTY5MDY4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Природа',
  },
];

export const mockRestaurants: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Pod Volat',
    cuisine: 'Crnogorska kuhinja',
    priceRange: '€€',
    rating: 4.7,
    distance: '400 m',
    image: 'https://images.unsplash.com/photo-1669131196140-49591336b13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzU5NTg4NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'rest-2',
    name: 'Leonardo',
    cuisine: 'Italijanska',
    priceRange: '€€€',
    rating: 4.8,
    distance: '650 m',
    image: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGl6emElMjByZXN0YXVyYW50fGVufDF8fHx8MTc1OTYxMTMwNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'rest-3',
    name: 'Fishermans House',
    cuisine: 'Mediteranska',
    priceRange: '€€',
    rating: 4.6,
    distance: '800 m',
    image: 'https://images.unsplash.com/photo-1672636401296-72fefd00e745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwZm9vZCUyMHNlYWZvb2R8ZW58MXx8fHwxNzU5NjkwNjgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'rest-4',
    name: 'Coffee Dreams',
    cuisine: 'Kafić',
    priceRange: '€',
    rating: 4.5,
    distance: '300 m',
    image: 'https://images.unsplash.com/photo-1629096668246-524da904215c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5Njg1NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export const mockServices: Service[] = [
  {
    id: 'serv-1',
    name: 'Заказать трансфер',
    icon: 'Car',
    description: 'Yandex.Taxi / Uber',
    action: 'taxi',
  },
  {
    id: 'serv-2',
    name: 'Уборка',
    icon: 'Sparkles',
    description: 'Профессиональная уборка',
    action: 'cleaning',
  },
  {
    id: 'serv-3',
    name: 'Экскурсии',
    icon: 'MapPin',
    description: 'Индивидуальные туры',
    action: 'tour',
  },
  {
    id: 'serv-4',
    name: 'Доставка еды',
    icon: 'UtensilsCrossed',
    description: 'Yandex.Eda / Delivery',
    action: 'food',
  },
];

// Рекомендации
export interface Recommendation {
  id: string;
  type: 'restaurant' | 'event' | 'attraction' | 'tour';
  name: string;
  description: string;
  image: string;
  badge?: string;
}

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    type: 'restaurant',
    name: 'Leonardo',
    description: 'Najbolja pizza u gradu',
    image: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGl6emElMjByZXN0YXVyYW50fGVufDF8fHx8MTc1OTYxMTMwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Popularno',
  },
  {
    id: 'rec-2',
    type: 'event',
    name: 'Koncert na otvorenom',
    description: 'Do 15. oktobra',
    image: 'https://images.unsplash.com/photo-1686571543445-29a4ba95387a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb250ZW5lZ3JvJTIwbW91bnRhaW5zJTIwbmF0dXJlfGVufDF8fHx8MTc1OTY5MDY4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Novo',
  },
  {
    id: 'rec-3',
    type: 'attraction',
    name: 'Hram Hristovog Vaskrsenja',
    description: 'Glavna atrakcija grada',
    image: 'https://images.unsplash.com/photo-1632670571306-120d101b1f7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb250ZW5lZ3JvJTIwY2h1cmNoJTIwY2F0aGVkcmFsfGVufDF8fHx8MTc1OTY5MDY3OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'rec-4',
    type: 'tour',
    name: 'Tura po Starom gradu',
    description: 'Individualna tura 2 sata',
    image: 'https://images.unsplash.com/photo-1648672693264-502a8a661864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb2Rnb3JpY2ElMjBNb250ZW5lZ3JvJTIwY2l0eXxlbnwxfHx8fDE3NTk2OTA2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Preporučujemo',
  },
];