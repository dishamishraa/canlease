import SalesforceApi from './SalesforceApi';

import {
  CreateApplication, ApplicationServiceContract,
} from './types';

export default class ApplicationService implements ApplicationServiceContract {
  private salesforceApi: SalesforceApi;


  constructor(salesforceApi: SalesforceApi) {
    this.salesforceApi = salesforceApi;
  }

  async createApplication(payload: CreateApplication): Promise<void> {
    return this.salesforceApi.createApplication(payload);
  }
}
