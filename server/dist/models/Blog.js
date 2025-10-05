export class Blog {
  id;
  title;
  slug;
  content;
  authorId;
  tags;
  published;
  createdAt;
  constructor(data) {
    this.id = data.id || crypto.randomUUID();
    this.title = data.title || '';
    this.slug = this.generateSlug(data.title || '');
    this.content = data.content || '';
    this.authorId = data.authorId || '';
    this.tags = data.tags || [];
    this.published = data.published || false;
    this.createdAt = data.createdAt || new Date().toISOString();
  }
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-');
  }
  validate() {
    const errors = [];
    if (!this.title) {
      errors.push('Title is required');
    } else if (this.title.length > 100) {
      errors.push('Title cannot be more than 100 characters');
    }
    if (!this.content) {
      errors.push('Content is required');
    }
    if (!this.authorId) {
      errors.push('Author is required');
    }
    if (!this.tags || this.tags.length === 0) {
      errors.push('At least one tag is required');
    }
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      content: this.content,
      authorId: this.authorId,
      tags: this.tags,
      published: this.published,
      createdAt: this.createdAt,
    };
  }
}
