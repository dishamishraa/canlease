import { Application } from 'express';
import createApp from './lib/createApp';
import { createRouter } from './router';
import { SalesforceApi, SendGridApi, QuoteService, QuoteController } from './modules/quote';

export default function App(): Application {
  const salesforceApi = new SalesforceApi();
  const sendGridApi = new SendGridApi();

  const quoteService = new QuoteService(salesforceApi, sendGridApi);

  const quoteController = new QuoteController(quoteService);

  return createApp(createRouter({
    quoteController
  }));
}
