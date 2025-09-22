import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { randomUUID } from 'crypto';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', '..', 'data', 'storage');
export class DataStore {
    filePath;
    constructor(fileName) {
        this.filePath = path.join(DATA_DIR, `${fileName}.json`);
    }
    async ensureFile() {
        try {
            await fs.access(this.filePath);
        }
        catch {
            // Ensure directory exists
            await fs.mkdir(DATA_DIR, { recursive: true });
            await fs.writeFile(this.filePath, '[]');
        }
    }
    async findAll() {
        await this.ensureFile();
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data) || [];
        }
        catch (error) {
            console.error(`Error reading ${this.filePath}:`, error);
            return [];
        }
    }
    async findById(id) {
        const items = await this.findAll();
        return items.find(item => item.id === id) || null;
    }
    async findOne(predicate) {
        const items = await this.findAll();
        return items.find(predicate) || null;
    }
    async create(item) {
        const items = await this.findAll();
        const newItem = {
            ...item,
            id: 'id' in item && item.id ? item.id : randomUUID()
        };
        items.push(newItem);
        await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
        return newItem;
    }
    async update(id, updates) {
        const items = await this.findAll();
        const index = items.findIndex(item => item.id === id);
        if (index === -1)
            return null;
        const updatedItem = {
            ...items[index],
            ...updates,
            id // Ensure ID doesn't get overwritten
        };
        items[index] = updatedItem;
        await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
        return updatedItem;
    }
    async delete(id) {
        const items = await this.findAll();
        const filteredItems = items.filter(item => item.id !== id);
        if (filteredItems.length === items.length) {
            return false;
        }
        await fs.writeFile(this.filePath, JSON.stringify(filteredItems, null, 2));
        return true;
    }
}
