import { Application } from 'express';
import createApp from './lib/createApp';
import { createRouter } from './router';
import { SalesforceApi, QuoteService, QuoteController } from './modules/quote';

export default function App(): Application {
  const salesforceApi = new SalesforceApi();

  const createQuoteService = new QuoteService(salesforceApi);

  const createQuoteController = new QuoteController(createQuoteService);

  return createApp(createRouter({
    createQuoteController
  }));
}
