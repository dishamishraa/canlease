import { Router } from 'express';
import { createApplicationRouter } from './ApplicationRouter';
import ApplicationController from './ApplicationController';
import ApplicationService from './ApplicationService';
import { ApplicationControllerContract, ApplicationServiceContract } from './types';

export {
  ApplicationControllerContract,
  ApplicationServiceContract,
  ApplicationController,
  ApplicationService,
};

export const ApplicationRouter = (controllers: {
  applicationController: ApplicationControllerContract;
}): Router => createApplicationRouter(controllers);
