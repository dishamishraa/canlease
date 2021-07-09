import { Router, Request, Response } from 'express';
import { QuoteControllerContract } from './types';
import { BadRequestError } from '../../lib/errors';
import { errorWrapper, validateId } from '../../lib/utils';
import { validateSendQuote } from './utils';
import { validateCreateQuote } from '../../lib/salesforce/utils';

export function createQuoteRouter(controllers: {
  quoteController: QuoteControllerContract;
}): Router {
  const router = Router();
  const { quoteController } = controllers;

  router.post('/', errorWrapper(async (req: Request, res: Response) => {
    if (!validateCreateQuote(req.body)) {
      throw BadRequestError();
    }
    const data = await quoteController.createQuote(req.body);
    res.status(200).send(data);
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
    if (!validateId(id)) {
      throw BadRequestError();
    }

    const response = await quoteController.getQuote(id);
    res.status(200).send(response);
  }));

  return router;
}
