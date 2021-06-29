import { Router } from 'express';
import { createPortfolioRouter } from './PortfolioRouter';
import PortfolioController from './PortfolioController';
import PortfolioService from './PortfolioService';
import { PortfolioControllerContract, PortfolioServiceContract } from './types';

export {
    PortfolioControllerContract,
    PortfolioServiceContract,
    PortfolioController,
    PortfolioService,
};

export const PortfolioRouter = (controllers: {
  portfolioController: PortfolioControllerContract;
}): Router => createPortfolioRouter(controllers);