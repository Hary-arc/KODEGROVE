import { RequestHandler } from 'express';

export function wrap(fn: (...args: any[]) => Promise<any>): RequestHandler {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}
