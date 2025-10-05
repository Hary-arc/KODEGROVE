export interface IBlog {
    id: string;
    title: string;
    slug: string;
    content: string;
    authorId: string;
    tags: string[];
    published: boolean;
    createdAt: string;
}
export declare class Blog implements IBlog {
    id: string;
    title: string;
    slug: string;
    content: string;
    authorId: string;
    tags: string[];
    published: boolean;
    createdAt: string;
    constructor(data: Partial<Blog>);
    private generateSlug;
    validate(): {
        isValid: boolean;
        errors: string[];
    };
    toJSON(): IBlog;
}
