export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  wifi: {
    ssid: string;
    password: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  checkIn: string;
  checkOut: string;
  hostContact: string;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  distance: string;
  rating: number;
  image: string;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  distance: string;
  image: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  action: string;
}

export type Language = 'ru' | 'en' | 'me';

export type Theme = 'light' | 'dark';
