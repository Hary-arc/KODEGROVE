import { User } from './User.js';
import { Blog } from './Blog.js';
import { DataStore } from '../utils/dataStore.js';
export interface IService {
    id: string;
    title: string;
    description: string;
    price: number;
    features: string[];
    createdAt: string;
}
export declare class Service implements IService {
    id: string;
    title: string;
    description: string;
    price: number;
    features: string[];
    createdAt: string;
    constructor(data: Partial<Service>);
    validate(): {
        isValid: boolean;
        errors: string[];
    };
    toJSON(): IService;
}
export declare const userStore: DataStore<User>;
export declare const blogStore: DataStore<Blog>;
export declare const serviceStore: DataStore<Service>;
export { User, Blog };
export type { IService as ServiceInterface };
