import { Application } from 'express';
import createApp from './lib/createApp';
import { createRouter } from './router';
import {
  SalesforceApi as QuoteSalesforceApi, SendGridApi, QuoteService, QuoteController,
} from './modules/quote';
import {
  SalesforceApi as ApplicationSalesforceApi, ApplicationService, ApplicationController,
} from './modules/application';

export default function App(): Application {
  const quoteSalesforceApi = new QuoteSalesforceApi();
  const sendGridApi = new SendGridApi();
  const quoteService = new QuoteService(quoteSalesforceApi, sendGridApi);
  const quoteController = new QuoteController(quoteService);

  const applicationSalesforceApi = new ApplicationSalesforceApi();
  const applicationService = new ApplicationService(applicationSalesforceApi);
  const applicationController = new ApplicationController(applicationService);

  return createApp(createRouter({
    quoteController,
    applicationController,
  }));
}
