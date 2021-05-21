import { Request, Response, NextFunction } from 'express';

export const mockErrorWrapper = (
  callback: (req: Request, res: Response, next: NextFunction) => Promise<void> | void,
) => async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    await callback(req, res, next);
  } catch (err) {
    next(err);
  }
};
