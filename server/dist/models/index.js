import { User } from './User';
import { Blog } from './Blog';
import { DataStore } from '../utils/dataStore';
export class Service {
    id;
    title;
    description;
    price;
    features;
    createdAt;
    constructor(data) {
        this.id = data.id || crypto.randomUUID();
        this.title = data.title || '';
        this.description = data.description || '';
        this.price = data.price || 0;
        this.features = data.features || [];
        this.createdAt = data.createdAt || new Date().toISOString();
    }
    validate() {
        const errors = [];
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
// Export types and classes
export { User, Blog };
