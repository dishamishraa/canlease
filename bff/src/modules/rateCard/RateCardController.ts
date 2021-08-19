import {
  CreateRate, CreateRateCard, Rate, RateCard, RateCardControllerContract, RateCardServiceContract,
} from './types';

export default class RateCardController implements RateCardControllerContract {
  private service: RateCardServiceContract;

  constructor(service: RateCardServiceContract) {
    this.service = service;
  }

  createRateCard(identityToken: string, payload: CreateRateCard): Promise<RateCard> {
    return this.service.createRateCard(identityToken, payload);
  }

  getRateCard(identityToken: string, id: number): Promise<RateCard> {
    return this.service.getRateCard(identityToken, id);
  }

  getRateCards(identityToken: string): Promise<RateCard[]> {
    return this.service.getRateCards(identityToken);
  }

  updateRateCard(
    identityToken: string, id: number, payload: Partial<CreateRateCard>,
  ): Promise<RateCard> {
    return this.service.updateRateCard(identityToken, id, payload);
  }

  deleteRateCard(identityToken: string, id: number): Promise<void> {
    return this.service.deleteRateCard(identityToken, id);
  }

  createRate(identityToken: string, payload: CreateRate): Promise<Rate> {
    return this.service.createRate(identityToken, payload);
  }

  getRates(identityToken: string, rateCardId: number): Promise<Rate[]> {
    return this.service.getRates(identityToken, rateCardId);
  }

  updateRate(identityToken: string, id: number, payload: Partial<CreateRate>): Promise<Rate> {
    return this.service.updateRate(identityToken, id, payload);
  }

  deleteRate(identityToken: string, id: number): Promise<void> {
    return this.service.deleteRate(identityToken, id);
  }
}
