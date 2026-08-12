export type AuthStep = 'LOGIN' | 'OTP' | 'REGISTER' | 'AUTHENTICATED';

export interface User {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  deliveryAddress: string;
  isLoggedIn: boolean;
  avatar?: string;
}

export interface Address {
  id: string;
  name: string;
  city: string;
  district: string;
  fullAddress: string;
  isDefault?: boolean;
  hasSpecialInstructions?: boolean;
  specialInstructions?: string;
  type: 'home' | 'work' | 'family' | 'other';
}

export interface Dada {
  id: string;
  name: string;
  type: 'dada' | 'traiteur';
  rating: number;
  reviewCount: number;
  experienceYears: number;
  avatar: string;
  bio: string;
  specialty: string;
  location: string;
  heroImage?: string;
}

export interface MenuItem {
  id: string;
  dadaId: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  price: number;
  remainingCount?: number;
  image: string;
  day?: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  dadaName: string;
  deliverySlot: string;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  date: string;
  deliverySlot: string;
  items: CartItem[];
  totalPrice: number;
  status: 'CONFIRMED' | 'DELIVERED' | 'CANCELLED';
  dadaName: string;
  dadaAvatar: string;
  rated?: boolean;
  userRating?: number;
  userComment?: string;
}

export type ActiveTab = 'DADAS' | 'TRAITEURS' | 'ORDERS' | 'PROFILE';
