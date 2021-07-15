import { RateCardListProps } from "../../components/organisms/RateCardList";

export type RateCard = {
  rateCardId: string;
  name: string;
  rates: Rate[];
};

export type Rate = {
  term: number;
  minReturn: number;
  maxReturn: number;
  interestRate: number;
  tenAtEndIR: string;
}