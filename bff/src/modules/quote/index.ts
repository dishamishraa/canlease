import { Router } from 'express';
import { createQuoteRouter } from './QuoteRouter';
import QuoteController from './QuoteController';
import QuoteService from './QuoteService';
import { CreateQuoteControllerContract, CreateQuoteServiceContract } from './types';
import SalesforceApi from './SalesforceApi';

export {
  CreateQuoteControllerContract,
  CreateQuoteServiceContract,
  QuoteController,
  QuoteService,
  SalesforceApi,
};

export const QuoteRouter = (controllers: {
  createQuoteController: CreateQuoteControllerContract;
}): Router => createQuoteRouter(controllers);
