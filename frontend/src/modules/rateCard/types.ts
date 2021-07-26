export type RateCard = {
    id: number;
    uuid: string;
    cardtype: string;
    createdAt: string;
    updatedAt: string;
}

export type RateCardPayload = {
  uuid: string;
  cardtype: string;
};

export type CreateRateCard = Pick<RateCard, 'cardtype'>;
export type UpdateRateCard = Partial<CreateRateCard> & { id: number };

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
}

export type CreateRate = Pick<Rate, 
    'term' | 
    'minmonthlyreturn' | 
    'maxmonthlyreturn' | 
    'regularir' | 
    'tenatendir' | 
    'ratecardid'>;
    
export type UpdateRate = Partial<CreateRate> & { rateId: number };
