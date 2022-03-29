export type RateCard = {
  id: number;
  uuid: string;
  cardtype: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateRateCard = Pick<RateCard, 'cardtype'>;
export type UpdateRateCard = Partial<CreateRateCard>;

export type Rate = {
  id: number;
  uuid: string;
  term: number;
  minmonthlyreturn: number;
  maxmonthlyreturn: number;
  regularir: number;
  tenatendir: number;
  ratecardid: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateRate = Pick<
Rate,
| 'term'
| 'minmonthlyreturn'
| 'maxmonthlyreturn'
| 'regularir'
| 'tenatendir'
| 'ratecardid'
>;

export type UpdateRate = Partial<CreateRate>;

export interface RateCardControllerContract {
  createRateCard(identityToken: string, payload: CreateRateCard): Promise<RateCard>;
  getRateCard(identityToken: string, id: number): Promise<RateCard>;
  getRateCards(identityToken: string): Promise<RateCard[]>;
  updateRateCard(identityToken: string, id: number, payload: UpdateRateCard): Promise<RateCard>;
  deleteRateCard(identityToken: string, id: number): Promise<void>;

  createRate(identityToken: string, payload: CreateRate): Promise<Rate>;
  getRates(identityToken: string, rateCardId: number): Promise<Rate[]>;
  updateRate(identityToken: string, id: number, payload: UpdateRate): Promise<Rate>;
  deleteRate(identityToken: string, id: number): Promise<void>;
}

export interface RateCardServiceContract {
  createRateCard(identityToken: string, payload: CreateRateCard): Promise<RateCard>;
  getRateCard(identityToken: string, id: number): Promise<RateCard>;
  getRateCards(identityToken: string): Promise<RateCard[]>;
  updateRateCard(identityToken: string, id: number, payload: UpdateRateCard): Promise<RateCard>;
  deleteRateCard(identityToken: string, id: number): Promise<void>;

  createRate(identityToken: string, payload: CreateRate): Promise<Rate>;
  getRates(identityToken: string, rateCardId: number): Promise<Rate[]>;
  updateRate(identityToken: string, id: number, payload: UpdateRate): Promise<Rate>;
  deleteRate(identityToken: string, id: number): Promise<void>;
}
