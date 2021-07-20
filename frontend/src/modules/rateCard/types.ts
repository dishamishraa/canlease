export type RateCardPayload = {
  uuid: string;
  cardtype: string;
};

export type RateCard = {
  id: number;
  uuid: string;
  cardtype: string;
  createdAt: string;
  updatedAt: string;
};

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