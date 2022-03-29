import { CreateApplication } from '../../lib/salesforce/types';

export interface ApplicationControllerContract {
  createApplication(payload: CreateApplication): Promise<void>;
}

export interface ApplicationServiceContract {
  createApplication(payload: CreateApplication): Promise<void>;
}
