import { RequestHandler } from 'express';
export declare function wrap(fn: (...args: any[]) => Promise<any>): RequestHandler;
