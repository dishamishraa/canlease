import { Router, Request, Response } from 'express';
import { PortfolioControllerContract } from './types';
import { BadRequestError } from '../../lib/errors';
import { errorWrapper } from '../../lib/utils';
import { validateId } from './utils';
import { portfolioResponse } from './fixtures';

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

    await portfolioController.getUserPortfolio(id);
    res.status(200).send(portfolioResponse);
  }));

  router.get('/:id/customer_portfolio', errorWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!validateId(id)) {
      throw BadRequestError();
    }

    await portfolioController.getCustomerPortfolio(id);
    res.status(200).send(portfolioResponse);
  }));

  return router;
}
