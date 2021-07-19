import { Router } from 'express';
import { createRateCardRouter } from './RateCardRouter';
import RateCardController from './RateCardController';
import RateCardService from './RateCardService';
import { RateCardControllerContract, RateCardServiceContract } from './types';

export {
    RateCardControllerContract,
    RateCardServiceContract,
    RateCardController,
    RateCardService,
};

export const RateCardRouter = (controllers: {
  rateCardController: RateCardControllerContract;
}): Router => createRateCardRouter(controllers);