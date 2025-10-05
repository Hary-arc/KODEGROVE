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
export declare class User implements IUser, IUserMethods {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: string;
  constructor(
    data: Partial<IUser> & {
      name: string;
      email: string;
      password: string;
    }
  );
  validate(): {
    isValid: boolean;
    errors: string[];
  };
  private validateEmail;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
  static hashPassword(password: string): Promise<string>;
  toJSON(): Omit<IUser, 'password'>;
}
export {};
