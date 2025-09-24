export class Invoice {
    id;
    userId;
    projectId;
    invoiceNumber;
    amount;
    status;
    dueDate;
    paidDate;
    description;
    lineItems;
    createdAt;
    updatedAt;
    constructor(data) {
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
    generateInvoiceNumber() {
        const year = new Date().getFullYear();
        const timestamp = Date.now().toString().slice(-6);
        return `INV-${year}-${timestamp}`;
    }
    validate() {
        const errors = [];
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
            errors
        };
    }
    markAsPaid(paymentDate) {
        this.status = 'paid';
        this.paidDate = paymentDate || new Date().toISOString().split('T')[0];
        this.updatedAt = new Date().toISOString();
    }
    markAsOverdue() {
        const today = new Date().toISOString().split('T')[0];
        if (this.dueDate < today && this.status === 'pending') {
            this.status = 'overdue';
            this.updatedAt = new Date().toISOString();
        }
    }
    toJSON() {
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
            updatedAt: this.updatedAt
        };
    }
}
