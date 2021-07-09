import { Router, Request, Response } from 'express';
import { PortfolioControllerContract } from './types';
import { BadRequestError } from '../../lib/errors';
import { errorWrapper, validateId } from '../../lib/utils';

export function createPortfolioRouter(controllers: {
  portfolioController: PortfolioControllerContract;
}): Router {
  const router = Router();
  const { portfolioController } = controllers;

  router.get('/:id', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }

    const response = await portfolioController.getUserPortfolio(id);
    res.status(200).send(response);
  }));

  router.get('/:id/customer_portfolio', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }

    const response = await portfolioController.getCustomerPortfolio(id);
    res.status(200).send(response);
  }));

  return router;
}
