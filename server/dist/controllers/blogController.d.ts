import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
export declare const getBlogs: (req: Request, res: Response) => Promise<void>;
export declare const getBlog: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createBlog: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBlog: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteBlog: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
