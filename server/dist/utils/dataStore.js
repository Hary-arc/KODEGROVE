import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { randomUUID } from 'crypto';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', '..', 'data', 'storage');
export class DataStore {
    filename;
    data = [];
    filePath;
    findOne;
    constructor(filename) {
        this.filename = filename;
        this.filePath = path.join(DATA_DIR, `${filename}.json`);
        this.loadData();
    }
    async loadData() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            this.data = JSON.parse(data);
        }
        catch (error) {
            // If file doesn't exist, start with empty array
            this.data = [];
            await this.saveData();
        }
    }
    async saveData() {
        try {
            // Ensure directory exists
            const dir = path.dirname(this.filePath);
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
        }
        catch (error) {
            console.error(`Error saving data to ${this.filePath}:`, error);
        }
    }
    async findAll(filter) {
        if (filter) {
            return this.data.filter(filter);
        }
        return [...this.data];
    }
    async findById(id) {
        return this.data.find(item => item.id === id) || null;
    }
    async create(item) {
        // Ensure the item has a unique ID, generating one if it doesn't.
        const newItem = {
            ...item,
            id: 'id' in item && item.id ? item.id : randomUUID()
        };
        this.data.push(newItem);
        await this.saveData();
        return newItem;
    }
    async update(id, updates) {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1)
            return null;
        this.data[index] = { ...this.data[index], ...updates };
        await this.saveData();
        return this.data[index];
    }
    async delete(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1)
            return false;
        this.data.splice(index, 1);
        await this.saveData();
        return true;
    }
    async count() {
        return this.data.length;
    }
}
