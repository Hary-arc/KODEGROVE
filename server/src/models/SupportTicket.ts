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

export class SupportTicket implements ISupportTicket {
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

  constructor(
    data: Partial<ISupportTicket> & {
      userId: string;
      title: string;
    }
  ) {
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

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

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

  resolve(): void {
    this.status = 'resolved';
    this.resolvedAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  reopen(): void {
    if (this.status === 'resolved' || this.status === 'closed') {
      this.status = 'open';
      this.resolvedAt = undefined;
      this.updatedAt = new Date().toISOString();
    }
  }

  assignTo(assignee: string): void {
    this.assignedTo = assignee;
    if (this.status === 'open') {
      this.status = 'in-progress';
    }
    this.updatedAt = new Date().toISOString();
  }

  toJSON(): ISupportTicket {
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
