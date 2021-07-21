import RateCardApi from './RateCardApi';
import {
  CreateRate, CreateRateCard, Rate, RateCard, RateCardServiceContract,
} from './types';

export default class RateCardService implements RateCardServiceContract {
  private rateCardApi: RateCardApi;

  constructor() {
    this.rateCardApi = new RateCardApi();
  }

  createRateCard(payload: CreateRateCard): Promise<RateCard> {
    return this.rateCardApi.createRateCard(payload);
  }

  getRateCard(id: number): Promise<RateCard> {
    return this.rateCardApi.getRateCard(id);
  }

  getRateCards(): Promise<RateCard[]> {
    return this.rateCardApi.getRateCards();
  }

  updateRateCard(id: number, payload: Partial<CreateRateCard>): Promise<RateCard> {
    return this.rateCardApi.updateRateCard(id, payload);
  }

  deleteRateCard(id: number): Promise<void> {
    return this.rateCardApi.deleteRateCard(id);
  }

  createRate(payload: CreateRate): Promise<Rate> {
    return this.rateCardApi.createRate(payload);
  }

  getRates(rateCardId: number): Promise<Rate[]> {
    return this.rateCardApi.getRates(rateCardId);
  }

  updateRate(id: number, payload: Partial<CreateRate>): Promise<Rate> {
    return this.rateCardApi.updateRate(id, payload);
  }

  deleteRate(id: number): Promise<void> {
    return this.rateCardApi.deleteRate(id);
  }
}
