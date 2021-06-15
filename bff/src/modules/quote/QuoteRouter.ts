import { Router, Request, Response } from 'express';
import { QuoteControllerContract } from './types';
import { BadRequestError } from '../../lib/errors';
import { errorWrapper } from '../../lib/utils';
import { validateCreateQuote, validateSendQuote, validateGetQuote } from './utils';
import { quoteResponseData } from './fixtures';


export function createQuoteRouter(controllers: {
  quoteController: QuoteControllerContract;
}): Router {
  const router = Router();
  const { quoteController } = controllers;

    router.post('/', errorWrapper(async (req: Request, res: Response) => {
    if (!validateCreateQuote(req.body)) {
      throw BadRequestError();
    }
    await quoteController.createQuote(req.body);
    res.sendStatus(200).send(quoteResponseData);
  }));

  router.post('/send', errorWrapper(async (req: Request, res: Response) => {
    if (!validateSendQuote(req.body)) {
      throw BadRequestError();
    }

    await quoteController.sendQuote(req.body);
    res.sendStatus(200);
  }));

  router.get('/:id', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateGetQuote(id)) {
      throw BadRequestError();
    }

    await quoteController.getQuote(id);
    res.sendStatus(200).send(quoteResponseData);
  }));

  return router;
}
