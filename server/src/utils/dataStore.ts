import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', '..', 'data', 'storage');

export class DataStore<T extends { id: string }> {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(DATA_DIR, `${fileName}.json`);
  }

  private async ensureFile(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, '[]');
    }
  }

  async findAll(): Promise<T[]> {
    await this.ensureFile();
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  async findById(id: string): Promise<T | null> {
    const items = await this.findAll();
    return items.find(item => item.id === id) || null;
  }

  async findOne(predicate: (item: T) => boolean): Promise<T | null> {
    const items = await this.findAll();
    return items.find(predicate) || null;
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const items = await this.findAll();
    const newItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9)
    } as T;
    
    items.push(newItem);
    await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
    return newItem;
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    const items = await this.findAll();
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    const updatedItem = {
      ...items[index],
      ...updates,
      id // Ensure ID doesn't get overwritten
    };
    
    items[index] = updatedItem;
    await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
    return updatedItem;
  }

  async delete(id: string): Promise<boolean> {
    const items = await this.findAll();
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) {
      return false;
    }
    
    await fs.writeFile(this.filePath, JSON.stringify(filteredItems, null, 2));
    return true;
  }
}