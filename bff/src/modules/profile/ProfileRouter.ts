import { Router, Request, Response } from 'express';
import { ProfileControllerContract } from './types';
import { BadRequestError } from '../../lib/errors';
import { errorWrapper } from '../../lib/utils';
import { validateAddQuote, validateCreateProfile, validateId } from './utils';
import mockResponse from './fixture/mockProfileResponse';
import { mockQuoteListResponse } from '../quote/fixtures';

export function createProfileRouter(controllers: {
  profileController: ProfileControllerContract;
}): Router {
  const router = Router();
  const { profileController } = controllers;

  router.post('/', errorWrapper(async (req: Request, res: Response) => {
    res.status(200).send(mockResponse);
    if (!validateCreateProfile(req.body)) {
      throw BadRequestError();
    }
    const data = await profileController.createProfile(req.body);
    res.status(200).send(data);
  }));

  router.get('/:id', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }
    // mock
    if (id === '1') {
      res.status(200).send(mockResponse);
    }
    const data = await profileController.getProfile(id);
    res.status(200).send(data);
  }));

  router.post('/actions/add_quote', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id) || !validateAddQuote(req.body)) {
      throw BadRequestError();
    }
    await profileController.addQuoteToProfile(id, req.body);
    res.status(204);
  }));

  router.get('/:id/quote', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }
    const data = await profileController.getAllQuotesFromProfile(id);
    res.status(200).send(mockQuoteListResponse);
  }));

  router.get('/:id/customer_quote', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }
    const data = await profileController.getAllCustomerQuotesFromProfile(id);
    res.status(200).send(mockQuoteListResponse);
  }));

  return router;
}
