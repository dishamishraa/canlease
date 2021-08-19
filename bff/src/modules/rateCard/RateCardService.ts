import RateCardApi from './RateCardApi';
import {
  CreateRate, CreateRateCard, Rate, RateCard, RateCardServiceContract,
} from './types';

export default class RateCardService implements RateCardServiceContract {
  private rateCardApi: RateCardApi;

  constructor() {
    this.rateCardApi = new RateCardApi();
  }

  createRateCard(identityToken: string, payload: CreateRateCard): Promise<RateCard> {
    return this.rateCardApi.createRateCard(identityToken, payload);
  }

  getRateCard(identityToken: string, id: number): Promise<RateCard> {
    return this.rateCardApi.getRateCard(identityToken, id);
  }

  getRateCards(identityToken: string): Promise<RateCard[]> {
    return this.rateCardApi.getRateCards(identityToken);
  }

  updateRateCard(
    identityToken: string, id: number, payload: Partial<CreateRateCard>,
  ): Promise<RateCard> {
    return this.rateCardApi.updateRateCard(identityToken, id, payload);
  }

  deleteRateCard(identityToken: string, id: number): Promise<void> {
    return this.rateCardApi.deleteRateCard(identityToken, id);
  }

  createRate(identityToken: string, payload: CreateRate): Promise<Rate> {
    return this.rateCardApi.createRate(identityToken, payload);
  }

  getRates(identityToken: string, rateCardId: number): Promise<Rate[]> {
    return this.rateCardApi.getRates(identityToken, rateCardId);
  }

  updateRate(identityToken: string, id: number, payload: Partial<CreateRate>): Promise<Rate> {
    return this.rateCardApi.updateRate(identityToken, id, payload);
  }

  deleteRate(identityToken: string, id: number): Promise<void> {
    return this.rateCardApi.deleteRate(identityToken, id);
  }
}
