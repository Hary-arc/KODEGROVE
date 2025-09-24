export declare class DataStore<T extends {
    id: string;
}> {
    private filename;
    private data;
    private filePath;
    findOne: any;
    constructor(filename: string);
    private loadData;
    private saveData;
    findAll(filter?: (item: T) => boolean): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(item: Omit<T, 'id'> | T): Promise<T>;
    update(id: string, updates: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    count(): Promise<number>;
}
