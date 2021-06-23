import { Router, Request, Response } from 'express';
import { ApplicationControllerContract } from './types';
import { BadRequestError } from '../../lib/errors';
import { errorWrapper } from '../../lib/utils';
import { validateCreateApplication } from './utils';

export function createApplicationRouter(controllers: {
  applicationController: ApplicationControllerContract;
}): Router {
  const router = Router();
  const { applicationController } = controllers;

  router.post('/', errorWrapper(async (req: Request, res: Response) => {
    if (!validateCreateApplication(req.body)) {
      throw BadRequestError();
    }
    await applicationController.createApplication(req.body);
    res.sendStatus(204);
  }));

  return router;
}
