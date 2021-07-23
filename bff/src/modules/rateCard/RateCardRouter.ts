import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../lib/errors';
import { errorWrapper, validateId } from '../../lib/utils';
import { mockRateCard } from './fixtures/mockRateCard';
import { mockRates } from './fixtures/mockRates';
import { RateCardControllerContract } from './types';

export function createRateCardRouter(controllers: {
  rateCardController: RateCardControllerContract;
}): Router {
  const router = Router();
  const { rateCardController } = controllers;

  router.post('/rate_cards', errorWrapper(async (req: Request, res: Response) => {
    const data = await rateCardController.createRateCard(req.body);
    res.status(200).send(data);
  }));

  router.get('/rate_cards/:id', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }
    const data = await rateCardController.getRateCard(Number(id));
    res.status(200).send(data);
  }));

  router.get('/rate_cards', errorWrapper(async (req: Request, res: Response) => {
    const data = await rateCardController.getRateCards();
    res.status(200).send(data);
  }));

  router.patch('/rate_cards/:id', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }
    const data = await rateCardController.updateRateCard(Number(id), req.body);
    res.status(200).send(data);
  }));

  router.delete('/rate_cards/:id', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }
    await rateCardController.deleteRateCard(Number(id));
    res.sendStatus(204);
  }));

  router.post('/rates', errorWrapper(async (req: Request, res: Response) => {
    const data = await rateCardController.createRate(req.body);
    res.status(200).send(data);
  }));

  router.get('/rate_cards/:rateCardId/rates', errorWrapper(async (req: Request, res: Response) => {
    const { rateCardId } = req.params;
    if (!validateId(rateCardId)) {
      throw BadRequestError();
    }
    const data = await rateCardController.getRates(Number(rateCardId));
    res.status(200).send(data);
  }));

  router.patch('/rates/:id', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }
    const data = await rateCardController.updateRate(Number(id), req.body);
    res.status(200).send(data);
  }));

  router.delete('/rates/:id', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }
    await rateCardController.deleteRate(Number(id));
    res.sendStatus(204);
  }));

  return router;
}
