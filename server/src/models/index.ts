import { User } from './User.js';
import { Blog } from './Blog.js';
import { Project } from './Project.js';
import { Invoice } from './Invoice.js';
import { SupportTicket } from './SupportTicket.js';
import { ClientAnalytics } from './ClientAnalytics.js';
import { DataStore } from '../utils/dataStore.js';

// Service interface and class
interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  createdAt: string;
}

class Service implements IService {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  createdAt: string;

  constructor(data: Partial<IService> & { title: string; description: string; price: number }) {
    this.id = data.id || crypto.randomUUID();
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.features = data.features || [];
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.title || this.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!this.description || this.description.trim().length === 0) {
      errors.push('Description is required');
    }

    if (this.price < 0) {
      errors.push('Price must be non-negative');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  toJSON(): IService {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      features: this.features,
      createdAt: this.createdAt
    };
  }
}

// Initialize data stores
export const userStore = new DataStore<User>('users');
export const blogStore = new DataStore<Blog>('blogs');
export const serviceStore = new DataStore<Service>('services');
export const projectStore = new DataStore<Project>('projects');
export const invoiceStore = new DataStore<Invoice>('invoices');
export const supportTicketStore = new DataStore<SupportTicket>('support_tickets');
export const clientAnalyticsStore = new DataStore<ClientAnalytics>('client_analytics');

// Export types and classes
export { User, Blog, Service, Project, Invoice, SupportTicket, ClientAnalytics };

// Export interfaces for TypeScript (avoid duplicates)
export type { 
  IProject, 
  IProjectTeam, 
  IProjectMilestone
} from './Project.js';
export type { IInvoice, IPayment } from './Invoice.js';
export type { ISupportTicket, ITicketMessage } from './SupportTicket.js';
export type { IClientAnalytics, IDashboardStats } from './ClientAnalytics.js';
export type { IService };