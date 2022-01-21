import { Router, Request, Response } from 'express';
import { IDENTITY_SESSION_COOKIE_NAME } from '../../lib/config';
import { BadRequestError, UnauthorizedError } from '../../lib/errors';
import { errorWrapper, getCookie, validateId } from '../../lib/utils';
import { RateCardControllerContract } from './types';
import SalesforceApi from '../../lib/salesforce/SalesforceApi';
import { isAdmin } from './utils';

export function createRateCardRouter(controllers: {
  rateCardController: RateCardControllerContract;
}): Router {
  const router = Router();
  const { rateCardController } = controllers;

  router.post('/rate_cards', errorWrapper(async (req: Request, res: Response) => {
    const identityToken = getCookie(req, IDENTITY_SESSION_COOKIE_NAME);
    const salesForceApi = new SalesforceApi();
    const userIsAdmin = await isAdmin(identityToken);
    if (!identityToken || !userIsAdmin) {
      throw UnauthorizedError();
    }

    const data = await rateCardController.createRateCard(identityToken, req.body);
    await salesForceApi.createRateCard({
      rateCardId: data.uuid,
      rateCardType: data.cardtype,
    });
    res.status(200).send(data);
  }));

  router.get('/rate_cards/:id', errorWrapper(async (req: Request, res: Response) => {
    const identityToken = getCookie(req, IDENTITY_SESSION_COOKIE_NAME);
    const userIsAdmin = await isAdmin(identityToken);
    if (!identityToken || !userIsAdmin) {
      throw UnauthorizedError();
    }

    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }

    const data = await rateCardController.getRateCard(identityToken, Number(id));
    res.status(200).send(data);
  }));

  router.get('/rate_cards', errorWrapper(async (req: Request, res: Response) => {
    const identityToken = getCookie(req, IDENTITY_SESSION_COOKIE_NAME);
    const userIsAdmin = await isAdmin(identityToken);
    if (!identityToken || !userIsAdmin) {
      throw UnauthorizedError();
    }

    const data = await rateCardController.getRateCards(identityToken);
    res.status(200).send(data);
  }));

  router.patch('/rate_cards/:id', errorWrapper(async (req: Request, res: Response) => {
    const identityToken = getCookie(req, IDENTITY_SESSION_COOKIE_NAME);
    const userIsAdmin = await isAdmin(identityToken);
    if (!identityToken || !userIsAdmin) {
      throw UnauthorizedError();
    }

    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }

    const data = await rateCardController.updateRateCard(identityToken, Number(id), req.body);
    res.status(200).send(data);
  }));

  router.delete('/rate_cards/:id', errorWrapper(async (req: Request, res: Response) => {
    const identityToken = getCookie(req, IDENTITY_SESSION_COOKIE_NAME);
    const userIsAdmin = await isAdmin(identityToken);
    if (!identityToken || !userIsAdmin) {
      throw UnauthorizedError();
    }

    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }

    await rateCardController.deleteRateCard(identityToken, Number(id));
    res.sendStatus(204);
  }));

  router.post('/rates', errorWrapper(async (req: Request, res: Response) => {
    const identityToken = getCookie(req, IDENTITY_SESSION_COOKIE_NAME);
    const userIsAdmin = await isAdmin(identityToken);

    if (!identityToken || !userIsAdmin) {
      throw UnauthorizedError();
    }

    const data = await rateCardController.createRate(identityToken, req.body);
    res.status(200).send(data);
  }));

  router.get('/rate_cards/:rateCardId/rates', errorWrapper(async (req: Request, res: Response) => {
    const identityToken = getCookie(req, IDENTITY_SESSION_COOKIE_NAME);
    const userIsAdmin = await isAdmin(identityToken);
    if (!identityToken || !userIsAdmin) {
      throw UnauthorizedError();
    }

    const { rateCardId } = req.params;
    if (!validateId(rateCardId)) {
      throw BadRequestError();
    }

    const data = await rateCardController.getRates(identityToken, Number(rateCardId));
    res.status(200).send(data);
  }));

  router.patch('/rates/:id', errorWrapper(async (req: Request, res: Response) => {
    const identityToken = getCookie(req, IDENTITY_SESSION_COOKIE_NAME);
    const userIsAdmin = await isAdmin(identityToken);
    if (!identityToken || !userIsAdmin) {
      throw UnauthorizedError();
    }

    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }

    const data = await rateCardController.updateRate(identityToken, Number(id), req.body);
    res.status(200).send(data);
  }));

  router.delete('/rates/:id', errorWrapper(async (req: Request, res: Response) => {
    const identityToken = getCookie(req, IDENTITY_SESSION_COOKIE_NAME);
    const userIsAdmin = await isAdmin(identityToken);
    if (!identityToken || !userIsAdmin) {
      throw UnauthorizedError();
    }

    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }

    await rateCardController.deleteRate(identityToken, Number(id));
    res.sendStatus(204);
  }));

  return router;
}
