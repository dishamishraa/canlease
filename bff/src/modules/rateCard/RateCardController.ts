import { CreateRate, CreateRateCard, Rate, RateCard, RateCardControllerContract, RateCardServiceContract } from "./types";

export default class RateCardController implements RateCardControllerContract {
    private service: RateCardServiceContract;

    constructor(service: RateCardServiceContract) {
        this.service = service;
    }

    createRateCard(payload: CreateRateCard): Promise<RateCard> {
        return this.service.createRateCard(payload);
    }
    getRateCard(id: number): Promise<RateCard> {
        return this.service.getRateCard(id);
    }
    getRateCards(): Promise<RateCard[]> {
        return this.service.getRateCards();
    }
    updateRateCard(id: number, payload: Partial<CreateRateCard>): Promise<RateCard> {
        return this.service.updateRateCard(id, payload);
    }
    deleteRateCard(id: number): Promise<void> {
        return this.service.deleteRateCard(id);
    }


    createRate(payload: CreateRate): Promise<Rate> {
        return this.service.createRate(payload);
    }
    getRates(rateCardId: number): Promise<Rate[]> {
        return this.service.getRates(rateCardId);
    }
    updateRate(id: number, payload: Partial<CreateRate>): Promise<Rate> {
        return this.service.updateRate(id, payload);
    }
    deleteRate(id: number): Promise<void> {
        return this.service.deleteRate(id);
    }

}