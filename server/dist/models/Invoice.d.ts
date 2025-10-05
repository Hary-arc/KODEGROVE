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
export declare class Invoice implements IInvoice {
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
  );
  private generateInvoiceNumber;
  validate(): {
    isValid: boolean;
    errors: string[];
  };
  markAsPaid(paymentDate?: string): void;
  markAsOverdue(): void;
  toJSON(): IInvoice;
}
