import { User } from './index.js';

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

export class Blog implements IBlog {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  tags: string[];
  published: boolean;
  createdAt: string;

  constructor(data: Partial<Blog>) {
    this.id = data.id || crypto.randomUUID();
    this.title = data.title || '';
    this.slug = this.generateSlug(data.title || '');
    this.content = data.content || '';
    this.authorId = data.authorId || '';
    this.tags = data.tags || [];
    this.published = data.published || false;
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-');
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

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
      errors
    };
  }

  toJSON(): IBlog {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      content: this.content,
      authorId: this.authorId,
      tags: this.tags,
      published: this.published,
      createdAt: this.createdAt
    };
  }
}