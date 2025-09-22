import { DataStore } from '../utils/dataStore';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  createdAt: string;
}

// Initialize data stores
export const userStore = new DataStore<User>('users');
export const blogStore = new DataStore<Blog>('blogs');
export const serviceStore = new DataStore<Service>('services');