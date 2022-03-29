import { Application } from 'express';
import createApp from './lib/createApp';
import { createRouter } from './router';
import { CommunicationApi, QuoteService, QuoteController } from './modules/quote';
import { ApplicationService, ApplicationController } from './modules/application';
import { PortfolioService, PortfolioController } from './modules/portfolio';
import { ProfileService, ProfileController } from './modules/profile';

import SalesforceApi from './lib/salesforce/SalesforceApi';
import { RateCardController, RateCardService } from './modules/rateCard';

export default function App(): Application {
  const salesforceApi = new SalesforceApi();
  const communicationApi = new CommunicationApi();

  const rateCardService = new RateCardService();
  const rateCardController = new RateCardController(rateCardService);

  const quoteService = new QuoteService(salesforceApi, communicationApi);
  const quoteController = new QuoteController(quoteService, rateCardService);

  const applicationService = new ApplicationService(salesforceApi);
  const applicationController = new ApplicationController(applicationService);

  const profileService = new ProfileService(salesforceApi);
  const profileController = new ProfileController(profileService);

  const portfolioService = new PortfolioService(salesforceApi);
  const portfolioController = new PortfolioController(portfolioService);

  return createApp(createRouter({
    quoteController,
    applicationController,
    portfolioController,
    profileController,
    rateCardController,
  }));
}
