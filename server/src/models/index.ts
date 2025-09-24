
import { User } from './User.js';
import { Blog } from './Blog.js';
import { Project } from './Project.js';
import { Invoice } from './Invoice.js';
import { SupportTicket } from './SupportTicket.js';
import { ClientAnalytics } from './ClientAnalytics.js';
import { DataStore } from '../utils/dataStore.js';

// Service interface and class
export interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  createdAt: string;
}

export class Service implements IService {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  createdAt: string;

  constructor(data: Partial<Service>) {
    this.id = data.id || crypto.randomUUID();
    this.title = data.title || '';
    this.description = data.description || '';
    this.price = data.price || 0;
    this.features = data.features || [];
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.title) {
      errors.push('Title is required');
    }

    if (!this.description) {
      errors.push('Description is required');
    }

    if (this.price < 0) {
      errors.push('Price must be positive');
    }

    if (!this.features || this.features.length === 0) {
      errors.push('At least one feature is required');
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
export { User, Blog, Project, Invoice, SupportTicket, ClientAnalytics };
// Re-export IService as ServiceInterface to avoid conflict
export type { IService as ServiceInterface };

// Export interfaces for TypeScript
export type { 
  IProject, 
  IProjectTeam, 
  IProjectMilestone,
  IInvoice, 
  IPayment,
  ISupportTicket, 
  ITicketMessage,
  IClientAnalytics,
  IDashboardStats 
} from './Project.js';
export type { IInvoice, IPayment } from './Invoice.js';
export type { ISupportTicket, ITicketMessage } from './SupportTicket.js';
export type { IClientAnalytics, IDashboardStats } from './ClientAnalytics.js';
