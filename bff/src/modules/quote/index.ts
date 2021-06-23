import { Router } from 'express';
import { createQuoteRouter } from './QuoteRouter';
import QuoteController from './QuoteController';
import QuoteService from './QuoteService';
import { QuoteControllerContract, QuoteServiceContract } from './types';
import SendGridApi from './SendGridApi';

export {
  QuoteControllerContract,
  QuoteServiceContract,
  QuoteController,
  QuoteService,
  SendGridApi,
};

export const QuoteRouter = (controllers: {
  quoteController: QuoteControllerContract;
}): Router => createQuoteRouter(controllers);
