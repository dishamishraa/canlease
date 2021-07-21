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
export type CreateRate = Pick<Rate,
'term' |
'minmonthlyreturn' |
'maxmonthlyreturn' |
'regularir' |
'tenatendir' |
'ratecardid'>;
export type UpdateRate = Partial<CreateRate>;

export interface RateCardControllerContract {
  createRateCard(payload: CreateRateCard): Promise<RateCard>;
  getRateCard(id: number): Promise<RateCard>;
  getRateCards(): Promise<RateCard[]>;
  updateRateCard(id: number, payload: UpdateRateCard): Promise<RateCard>;
  deleteRateCard(id: number): Promise<void>;

  createRate(payload: CreateRate): Promise<Rate>;
  getRates(rateCardId: number): Promise<Rate[]>;
  updateRate(id: number, payload: UpdateRate): Promise<Rate>;
  deleteRate(id: number): Promise<void>;
}

export interface RateCardServiceContract {
  createRateCard(payload: CreateRateCard): Promise<RateCard>;
  getRateCard(id: number): Promise<RateCard>;
  getRateCards(): Promise<RateCard[]>;
  updateRateCard(id: number, payload: UpdateRateCard): Promise<RateCard>;
  deleteRateCard(id: number): Promise<void>;

  createRate(payload: CreateRate): Promise<Rate>;
  getRates(rateCardId: number): Promise<Rate[]>;
  updateRate(id: number, payload: UpdateRate): Promise<Rate>;
  deleteRate(id: number): Promise<void>;
}
