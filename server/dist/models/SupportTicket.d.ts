export interface ISupportTicket {
    id: string;
    userId: string;
    projectId?: string;
    title: string;
    description?: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: 'technical' | 'billing' | 'general' | 'feature-request' | 'bug-report';
    assignedTo?: string;
    createdAt: string;
    updatedAt: string;
    resolvedAt?: string;
}
export interface ITicketMessage {
    id: string;
    ticketId: string;
    senderName: string;
    senderType: 'client' | 'support' | 'system';
    message: string;
    attachments?: any;
    createdAt: string;
}
export declare class SupportTicket implements ISupportTicket {
    id: string;
    userId: string;
    projectId?: string;
    title: string;
    description?: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: 'technical' | 'billing' | 'general' | 'feature-request' | 'bug-report';
    assignedTo?: string;
    createdAt: string;
    updatedAt: string;
    resolvedAt?: string;
    constructor(data: Partial<ISupportTicket> & {
        userId: string;
        title: string;
    });
    validate(): {
        isValid: boolean;
        errors: string[];
    };
    resolve(): void;
    reopen(): void;
    assignTo(assignee: string): void;
    toJSON(): ISupportTicket;
}
