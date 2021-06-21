import { Router, Request, Response } from 'express';
import { ApplicationControllerContract } from './types';
import { BadRequestError } from '../../lib/errors';
import { errorWrapper } from '../../lib/utils';
import { validateCreateApplication } from './utils';

export function createApplicationRouter(controllers: {
  applicationontroller: ApplicationControllerContract;
}): Router {
  const router = Router();
  const { applicationontroller } = controllers;

  router.post('/', errorWrapper(async (req: Request, res: Response) => {
    if (!validateCreateApplication(req.body)) {
      throw BadRequestError();
    }
    await applicationontroller.createApplication(req.body);
    res.status(200);
  }));

  return router;
}
