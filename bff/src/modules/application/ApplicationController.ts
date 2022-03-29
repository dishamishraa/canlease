import { CreateApplication } from '../../lib/salesforce/types';
import { ApplicationControllerContract, ApplicationServiceContract } from './types';

export default class ApplicationController implements ApplicationControllerContract {
  private applicationService: ApplicationServiceContract;

  constructor(applicationService: ApplicationServiceContract) {
    this.applicationService = applicationService;
  }

  createApplication(payload: CreateApplication): Promise<void> {
    return this.applicationService.createApplication(payload);
  }
}
