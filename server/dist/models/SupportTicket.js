export class SupportTicket {
    id;
    userId;
    projectId;
    title;
    description;
    status;
    priority;
    category;
    assignedTo;
    createdAt;
    updatedAt;
    resolvedAt;
    constructor(data) {
        this.id = data.id || crypto.randomUUID();
        this.userId = data.userId;
        this.projectId = data.projectId;
        this.title = data.title;
        this.description = data.description;
        this.status = data.status || 'open';
        this.priority = data.priority || 'medium';
        this.category = data.category || 'general';
        this.assignedTo = data.assignedTo;
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        this.resolvedAt = data.resolvedAt;
    }
    validate() {
        const errors = [];
        if (!this.userId) {
            errors.push('User ID is required');
        }
        if (!this.title || this.title.trim().length === 0) {
            errors.push('Title is required');
        }
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
    resolve() {
        this.status = 'resolved';
        this.resolvedAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }
    reopen() {
        if (this.status === 'resolved' || this.status === 'closed') {
            this.status = 'open';
            this.resolvedAt = undefined;
            this.updatedAt = new Date().toISOString();
        }
    }
    assignTo(assignee) {
        this.assignedTo = assignee;
        if (this.status === 'open') {
            this.status = 'in-progress';
        }
        this.updatedAt = new Date().toISOString();
    }
    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            projectId: this.projectId,
            title: this.title,
            description: this.description,
            status: this.status,
            priority: this.priority,
            category: this.category,
            assignedTo: this.assignedTo,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            resolvedAt: this.resolvedAt,
        };
    }
}
