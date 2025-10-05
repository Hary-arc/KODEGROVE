import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
export declare const getServices: (req: Request, res: Response) => Promise<void>;
export declare const getService: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createService: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateService: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteService: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
