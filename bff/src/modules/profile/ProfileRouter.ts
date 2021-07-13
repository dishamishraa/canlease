import { Router, Request, Response } from 'express';
import { ProfileControllerContract } from './types';
import { BadRequestError, UnauthorizedError } from '../../lib/errors';
import { errorWrapper, getCookie, validateId } from '../../lib/utils';
import {
  decodeIdentityToken,
} from './utils';
import { IDENTITY_SESSION_COOKIE_NAME } from '../../lib/config';
import { validateCreateProfile, validateAddQuote } from '../../lib/salesforce/utils';

export function createProfileRouter(controllers: {
  profileController: ProfileControllerContract;
}): Router {
  const router = Router();
  const { profileController } = controllers;

  router.post('/', errorWrapper(async (req: Request, res: Response) => {
    if (!validateCreateProfile(req.body)) {
      throw BadRequestError();
    }
    const data = await profileController.createProfile(req.body);
    res.status(200).send(data);
  }));

  router.get('/me', errorWrapper(async (req: Request, res: Response) => {
    const identityToken = getCookie(req, IDENTITY_SESSION_COOKIE_NAME);
    if (!identityToken) {
      throw UnauthorizedError("identityToken empty");
    }

    const identityTokenPayload = decodeIdentityToken(identityToken);
    if (!identityTokenPayload) {
      throw UnauthorizedError("identityTokenPayload empty");
    }

    const data = await profileController.getProfile(`${identityTokenPayload.id}`);
    res.status(200).send(data);
  }));

  router.post('/:id/actions/add_quote', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id) || !validateAddQuote(req.body)) {
      throw BadRequestError();
    }
    const { quoteId } = req.body;
    await profileController.addQuoteToProfile(id, quoteId);
    res.status(204);
  }));

  router.get('/:id/quote', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }
    const data = await profileController.getAllQuotesFromProfile(id);
    res.status(200).send(data);
  }));

  router.get('/:id/customer_quote', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }
    const data = await profileController.getAllCustomerQuotesFromProfile(id);
    res.status(200).send(data);
  }));

  return router;
}
