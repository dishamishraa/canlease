import { Router } from 'express';
import { createQuoteRouter } from './QuoteRouter';
import QuoteController from './QuoteController';
import QuoteService from './QuoteService';
import { QuoteControllerContract, QuoteServiceContract } from './types';
import CommunicationApi from './CommunicationApi';

export {
  QuoteControllerContract,
  QuoteServiceContract,
  QuoteController,
  QuoteService,
  CommunicationApi,
};

export const QuoteRouter = (controllers: {
  quoteController: QuoteControllerContract;
}): Router => createQuoteRouter(controllers);
