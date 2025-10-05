import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
export declare const getDashboardData: (
  req: AuthRequest,
  res: Response
) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserProjects: (
  req: AuthRequest,
  res: Response
) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserInvoices: (
  req: AuthRequest,
  res: Response
) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserSupportTickets: (
  req: AuthRequest,
  res: Response
) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserAnalytics: (
  req: AuthRequest,
  res: Response
) => Promise<Response<any, Record<string, any>> | undefined>;
