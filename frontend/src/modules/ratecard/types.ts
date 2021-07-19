export type RateCard = {
    id: number;
    uuid: string;
    cardtype: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateRateCard = Pick<RateCard, 'cardtype'>;

