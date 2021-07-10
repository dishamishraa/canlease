import { Application } from 'express';
import createApp from './lib/createApp';
import { createRouter } from './router';
import {
  SendGridApi, QuoteService, QuoteController,
} from './modules/quote';
import {
  ApplicationService, ApplicationController,
} from './modules/application';
import {
  PortfolioService, PortfolioController,
} from './modules/portfolio';
import {
  ProfileService, ProfileController,
} from './modules/profile';

import SalesforceApi from './lib/salesforce/SalesforceApi';

export default function App(): Application {
  const salesforceApi = new SalesforceApi();
  const sendGridApi = new SendGridApi();
  const quoteService = new QuoteService(salesforceApi, sendGridApi);
  const quoteController = new QuoteController(quoteService);

  const applicationService = new ApplicationService(salesforceApi);
  const applicationController = new ApplicationController(applicationService);

  const profileService = new ProfileService(salesforceApi);
  const profileController = new ProfileController(profileService);
  const portfolioSalesforceApi = new SalesforceApi();
  const portfolioService = new PortfolioService(portfolioSalesforceApi);
  const portfolioController = new PortfolioController(portfolioService);

  return createApp(createRouter({
    quoteController,
    applicationController,
    portfolioController,
    profileController,
  }));
}
