import SalesforceApi from '../../lib/salesforce/SalesforceApi';
import { CreateApplication } from '../../lib/salesforce/types';
import {
  ApplicationServiceContract,
} from './types';

export default class ApplicationService implements ApplicationServiceContract {
  private salesforceApi: SalesforceApi;

  constructor(salesforceApi: SalesforceApi) {
    this.salesforceApi = salesforceApi;
  }

  createApplication(payload: CreateApplication): Promise<void> {
    return this.salesforceApi.createApplication(payload);
  }
}
