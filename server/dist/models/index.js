import { User } from './User.js';
import { Blog } from './Blog.js';
import { Project } from './Project.js';
import { Invoice } from './Invoice.js';
import { SupportTicket } from './SupportTicket.js';
import { ClientAnalytics } from './ClientAnalytics.js';
import { DataStore } from '../utils/dataStore.js';
class Service {
    id;
    title;
    description;
    price;
    features;
    createdAt;
    constructor(data) {
        this.id = data.id || crypto.randomUUID();
        this.title = data.title;
        this.description = data.description;
        this.price = data.price;
        this.features = data.features || [];
        this.createdAt = data.createdAt || new Date().toISOString();
    }
    validate() {
        const errors = [];
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
    toJSON() {
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
export const userStore = new DataStore('users');
export const blogStore = new DataStore('blogs');
export const serviceStore = new DataStore('services');
export const projectStore = new DataStore('projects');
export const invoiceStore = new DataStore('invoices');
export const supportTicketStore = new DataStore('support_tickets');
export const clientAnalyticsStore = new DataStore('client_analytics');
// Export types and classes
export { User, Blog, Service, Project, Invoice, SupportTicket, ClientAnalytics };
