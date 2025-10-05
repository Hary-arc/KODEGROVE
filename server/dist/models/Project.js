export class Project {
  id;
  userId;
  name;
  slug;
  type;
  status;
  priority;
  progress;
  budget;
  spent;
  startDate;
  expectedCompletion;
  actualCompletion;
  description;
  requirements;
  deliverables;
  createdAt;
  updatedAt;
  constructor(data) {
    this.id = data.id || crypto.randomUUID();
    this.userId = data.userId;
    this.name = data.name;
    this.slug = data.slug || this.generateSlug(data.name);
    this.type = data.type;
    this.status = data.status || 'planning';
    this.priority = data.priority || 'medium';
    this.progress = data.progress || 0;
    this.budget = data.budget;
    this.spent = data.spent || 0;
    this.startDate = data.startDate;
    this.expectedCompletion = data.expectedCompletion;
    this.actualCompletion = data.actualCompletion;
    this.description = data.description;
    this.requirements = data.requirements;
    this.deliverables = data.deliverables;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }
  generateSlug(name) {
    return (
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') +
      '-' +
      Date.now()
    );
  }
  validate() {
    const errors = [];
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Project name is required');
    }
    if (!this.userId) {
      errors.push('User ID is required');
    }
    if (this.budget < 0) {
      errors.push('Budget must be non-negative');
    }
    if (this.spent < 0) {
      errors.push('Spent amount must be non-negative');
    }
    if (this.progress < 0 || this.progress > 100) {
      errors.push('Progress must be between 0 and 100');
    }
    if (!this.startDate) {
      errors.push('Start date is required');
    }
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
  updateProgress(newProgress) {
    if (newProgress >= 0 && newProgress <= 100) {
      this.progress = newProgress;
      this.updatedAt = new Date().toISOString();
      if (newProgress === 100 && this.status !== 'completed') {
        this.status = 'completed';
        this.actualCompletion = new Date().toISOString().split('T')[0];
      }
    }
  }
  addExpense(amount) {
    if (amount > 0) {
      this.spent += amount;
      this.updatedAt = new Date().toISOString();
    }
  }
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      slug: this.slug,
      type: this.type,
      status: this.status,
      priority: this.priority,
      progress: this.progress,
      budget: this.budget,
      spent: this.spent,
      startDate: this.startDate,
      expectedCompletion: this.expectedCompletion,
      actualCompletion: this.actualCompletion,
      description: this.description,
      requirements: this.requirements,
      deliverables: this.deliverables,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
