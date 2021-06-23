import { Application } from 'express';
import createApp from './lib/createApp';
import { createRouter } from './router';
import {
  SendGridApi, QuoteService, QuoteController,
} from './modules/quote';
import {
  ApplicationService, ApplicationController,
} from './modules/application';
import SalesforceApi from './lib/salesforce/SalesforceApi';

export default function App(): Application {
  const quoteSalesforceApi = new SalesforceApi();
  const sendGridApi = new SendGridApi();
  const quoteService = new QuoteService(quoteSalesforceApi, sendGridApi);
  const quoteController = new QuoteController(quoteService);

  const applicationSalesforceApi = new SalesforceApi();
  const applicationService = new ApplicationService(applicationSalesforceApi);
  const applicationController = new ApplicationController(applicationService);

  return createApp(createRouter({
    quoteController,
    applicationController,
  }));
}
