export declare class DataStore<T extends {
    id: string;
}> {
    private filePath;
    constructor(fileName: string);
    private ensureFile;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    findOne(predicate: (item: T) => boolean): Promise<T | null>;
    create(item: Omit<T, 'id'> | T): Promise<T>;
    update(id: string, updates: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
