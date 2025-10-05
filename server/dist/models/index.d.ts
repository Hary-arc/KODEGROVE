import { User } from './User.js';
import { Blog } from './Blog.js';
import { Project } from './Project.js';
import { Invoice } from './Invoice.js';
import { SupportTicket } from './SupportTicket.js';
import { ClientAnalytics } from './ClientAnalytics.js';
import { DataStore } from '../utils/dataStore.js';
interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  createdAt: string;
}
declare class Service implements IService {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  createdAt: string;
  constructor(
    data: Partial<IService> & {
      title: string;
      description: string;
      price: number;
    }
  );
  validate(): {
    isValid: boolean;
    errors: string[];
  };
  toJSON(): IService;
}
export declare const userStore: DataStore<User>;
export declare const blogStore: DataStore<Blog>;
export declare const serviceStore: DataStore<Service>;
export declare const projectStore: DataStore<Project>;
export declare const invoiceStore: DataStore<Invoice>;
export declare const supportTicketStore: DataStore<SupportTicket>;
export declare const clientAnalyticsStore: DataStore<ClientAnalytics>;
export { User, Blog, Service, Project, Invoice, SupportTicket, ClientAnalytics };
export type { IProject, IProjectTeam, IProjectMilestone } from './Project.js';
export type { IInvoice, IPayment } from './Invoice.js';
export type { ISupportTicket, ITicketMessage } from './SupportTicket.js';
export type { IClientAnalytics, IDashboardStats } from './ClientAnalytics.js';
export type { IService };
