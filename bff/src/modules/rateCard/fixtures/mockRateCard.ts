import { RateCard } from '../types';

export const mockRateCard: RateCard = {
  id: 1,
  uuid: '1',
  cardtype: 'Test Rate Card',
  createdAt: 'test',
  updatedAt: 'test',
};

export const mockRateCards: RateCard[] = [
  mockRateCard,
  {
    id: 2,
    uuid: '2',
    cardtype: 'Second Rate Card',
    createdAt: 'test',
    updatedAt: 'test',
  },
];
