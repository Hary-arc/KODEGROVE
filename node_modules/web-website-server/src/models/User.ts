import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface IUserMethods {
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

export class User implements IUser, IUserMethods {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: string;

  constructor(data: Partial<Omit<IUser, 'id'>>) {
    this.id = crypto.randomUUID();
    this.name = data.name || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.role = data.role || 'user';
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.name) {
      errors.push('Name is required');
    }

    if (!this.email) {
      errors.push('Email is required');
    } else if (!this.validateEmail(this.email)) {
      errors.push('Please add a valid email');
    }

    if (!this.password) {
      errors.push('Password is required');
    } else if (this.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

  async matchPassword(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  getSignedJwtToken(): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is required');
    }

    return jwt.sign(
      { id: this.id },
      process.env.JWT_SECRET as jwt.Secret,
      { 
        expiresIn: (process.env.JWT_EXPIRE || '30d') as jwt.SignOptions['expiresIn']
      }
    );
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  toJSON(): Omit<IUser, 'password'> {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}