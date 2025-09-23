import { Request, Response, NextFunction } from 'express';
import { User } from '../models/index.js';
export interface AuthRequest extends Request {
    user: User;
}
export declare const protect: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const authorize: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
