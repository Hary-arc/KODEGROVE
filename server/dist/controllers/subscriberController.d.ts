import { Request, Response } from 'express';
export declare function createSubscriber(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function listSubscribers(req: Request, res: Response): Promise<void>;
