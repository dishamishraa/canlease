import { Router, Request, Response } from 'express';
import { QuoteControllerContract } from './types';
import { BadRequestError } from '../../lib/errors';
import { errorWrapper } from '../../lib/utils';
import { validateCreateQuote, validateSendQuote } from './utils';

export function createQuoteRouter(controllers: {
  quoteController: QuoteControllerContract;
}): Router {
  const router = Router();
  const { quoteController } = controllers;

  router.post('/create', errorWrapper(async (req: Request, res: Response) => {
    if (!validateCreateQuote(req.body)) {
      throw BadRequestError();
    }

    await quoteController.createQuote(req.body);
    res.sendStatus(200);
  }));

  router.post('/send', errorWrapper(async (req: Request, res: Response) => {
    if (!validateSendQuote(req.body)) {
      throw BadRequestError();
    }

    await quoteController.sendQuote(req.body);
    res.sendStatus(200);
  }));

  return router;
}
