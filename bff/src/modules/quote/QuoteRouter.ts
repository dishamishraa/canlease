import { Router, Request, Response } from 'express';
import { QuoteControllerContract } from './types';
import { BadRequestError } from '../../lib/errors';
import { errorWrapper, getCookie, validateId } from '../../lib/utils';
import { validateSendQuote } from './utils';
import { validateCreateQuote } from '../../lib/salesforce/utils';
import { IDENTITY_SESSION_COOKIE_NAME } from '../../lib/config';
import { decodeIdentityToken } from '../profile/utils';

export function createQuoteRouter(controllers: {
  quoteController: QuoteControllerContract;
}): Router {
  const router = Router();
  const { quoteController } = controllers;

  router.post('/', errorWrapper(async (req: Request, res: Response) => {
    const identityToken = getCookie(req, IDENTITY_SESSION_COOKIE_NAME);

    let profile;
    if (identityToken) {
      const identityTokenPayload = decodeIdentityToken(identityToken);

      if (identityTokenPayload) {
        profile = await quoteController.getProfile(`${identityTokenPayload.uuid}`);
      }
    }

    if (!validateCreateQuote(req.body)) {
      throw BadRequestError();
    }
    const data = await quoteController.createQuote(req.body, profile);
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
