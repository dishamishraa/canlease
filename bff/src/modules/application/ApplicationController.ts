import {
  CreateApplication, ApplicationControllerContract, ApplicationServiceContract,
} from './types';

export default class ApplicationController implements ApplicationControllerContract {
  private createApplicationService: ApplicationServiceContract;

  constructor(createApplicationService: ApplicationServiceContract) {
    this.createApplicationService = createApplicationService;
  }

  async createApplication(payload: CreateApplication): Promise<void> {
    return this.createApplicationService.createApplication(payload);
  }
}
