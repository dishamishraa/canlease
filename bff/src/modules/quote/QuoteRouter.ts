import { Router, Request, Response } from 'express';
import { CreateQuoteControllerContract } from './types';
import { BadRequestError } from '../../lib/errors';
import { errorWrapper } from '../../lib/utils';
import { validateCreateQuote } from './utils';

export function createQuoteRouter(controllers: {
  createQuoteController: CreateQuoteControllerContract;
}): Router {
  const router = Router();
  const { createQuoteController } = controllers;

  router.post('/', errorWrapper(async (req: Request, res: Response) => {
    if (!validateCreateQuote(req.body)) {
      throw BadRequestError();
    }

    await createQuoteController.createQuote(req.body);
    res.sendStatus(200);
  }));

  return router;
}
