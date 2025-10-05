export interface IInvoice {
  id: string;
  userId: string;
  projectId?: string;
  invoiceNumber: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled' | 'draft';
  dueDate: string;
  paidDate?: string;
  description?: string;
  lineItems?: any;
  createdAt: string;
  updatedAt: string;
}

export interface IPayment {
  id: string;
  invoiceId: string;
  userId: string;
  amount: number;
  paymentMethod?: string;
  transactionId?: string;
  paymentProcessor?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  processedAt?: string;
  createdAt: string;
}

export class Invoice implements IInvoice {
  id: string;
  userId: string;
  projectId?: string;
  invoiceNumber: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled' | 'draft';
  dueDate: string;
  paidDate?: string;
  description?: string;
  lineItems?: any;
  createdAt: string;
  updatedAt: string;

  constructor(
    data: Partial<IInvoice> & {
      userId: string;
      amount: number;
      dueDate: string;
    }
  ) {
    this.id = data.id || crypto.randomUUID();
    this.userId = data.userId;
    this.projectId = data.projectId;
    this.invoiceNumber = data.invoiceNumber || this.generateInvoiceNumber();
    this.amount = data.amount;
    this.status = data.status || 'draft';
    this.dueDate = data.dueDate;
    this.paidDate = data.paidDate;
    this.description = data.description;
    this.lineItems = data.lineItems;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  private generateInvoiceNumber(): string {
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-6);
    return `INV-${year}-${timestamp}`;
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.userId) {
      errors.push('User ID is required');
    }

    if (this.amount <= 0) {
      errors.push('Amount must be greater than 0');
    }

    if (!this.dueDate) {
      errors.push('Due date is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  markAsPaid(paymentDate?: string): void {
    this.status = 'paid';
    this.paidDate = paymentDate || new Date().toISOString().split('T')[0];
    this.updatedAt = new Date().toISOString();
  }

  markAsOverdue(): void {
    const today = new Date().toISOString().split('T')[0];
    if (this.dueDate < today && this.status === 'pending') {
      this.status = 'overdue';
      this.updatedAt = new Date().toISOString();
    }
  }

  toJSON(): IInvoice {
    return {
      id: this.id,
      userId: this.userId,
      projectId: this.projectId,
      invoiceNumber: this.invoiceNumber,
      amount: this.amount,
      status: this.status,
      dueDate: this.dueDate,
      paidDate: this.paidDate,
      description: this.description,
      lineItems: this.lineItems,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
