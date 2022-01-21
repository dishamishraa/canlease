import calculator from '../calculator';
import { RateCardServiceContract } from '../rateCard';
import { Rate, RateCard } from '../rateCard/types';
import { NotFoundError } from '../../lib/errors';
import { SPINDL_API_TOKEN } from '../../lib/config';
import {
  CreateQuote,
  isCreateQuoteCustomer,
  isCreateQuoteVendor,
  Quote,
  QuoteOption,
  Profile,
} from '../../lib/salesforce/types';
import {
  QuoteControllerContract,
  QuoteServiceContract,
  SendQuote,
} from './types';

export default class QuoteController implements QuoteControllerContract {
  private createQuoteService: QuoteServiceContract;

  private rateCardService: RateCardServiceContract;

  constructor(createQuoteService: QuoteServiceContract, rateCardService: RateCardServiceContract) {
    this.createQuoteService = createQuoteService;
    this.rateCardService = rateCardService;
  }

  async getRates(rateCard: RateCard, applicationAmount: number): Promise<Rate[]> {
    const rateCardRates = await this.rateCardService.getRates(SPINDL_API_TOKEN, rateCard.id);
    return rateCardRates
      .filter(
        ({ minmonthlyreturn, maxmonthlyreturn }) => applicationAmount >= minmonthlyreturn
          && applicationAmount < maxmonthlyreturn,
      )
      .sort((rate1, rate2) => rate1.term - rate2.term);
  }

  getCardType(payload: CreateQuote): string {
    // It uses the v card for vendors
    // the specified card for Canlease Reps
    // e card for everyone else

    if (payload.rateCardType) {
      return payload.rateCardType;
    }
    if (isCreateQuoteVendor(payload)) {
      return 'vendor card';
    }
    return 'end-user card';
  }

  getProfile(portalId: string): Promise<Profile> {
    return this.createQuoteService.getProfile(portalId);
  }

  async createQuote(payload: CreateQuote, profile: Profile | undefined): Promise<Quote> {
    const { applicationAmount, leaseType, fee = 0 } = payload;
    const terms: number[] = [24, 36, 48, 60];
    const interestRates: Record<number, number> = {};
    let cardType: string;

    if (profile && profile.rateCard) {
      cardType = profile.rateCard;
    } else {
      cardType = this.getCardType(payload);
    }

    const rateCards = await this.rateCardService.getRateCards(SPINDL_API_TOKEN);
    let rateCard = rateCards.find((card) => card.cardtype.toLowerCase() === cardType);
    if (!rateCard) {
      // throw NotFoundError('no matching rate card');
      rateCard = rateCards.find(
        (card) => card.cardtype.toLowerCase() === this.getCardType(payload),
      );
    }

    const rates = await this.getRates(rateCard!, applicationAmount);
    rates.forEach(({ term, regularir, tenatendir }) => {
      interestRates[term] = leaseType === 'stretch' ? regularir : tenatendir;
    });

    const payments = calculator.calculateMonthlyPayments(
      applicationAmount,
      fee,
      leaseType,
      interestRates,
      terms,
    );

    const quoteOptions: QuoteOption[] = payments
      .map(({ amount, costOfFinanceRate, term }): QuoteOption => ({
        monthlyAmount: amount,
        financeRate: parseFloat((costOfFinanceRate * 100).toFixed(4)),
        term: `${term}M`,
        purchaseOptionDate: '',
      }));

    const quote = await this.createQuoteService.createQuote({
      ...payload,
      quoteOptions,
    });

    if (payload.sendEmail) {
      if (isCreateQuoteCustomer(payload)) {
        await this.sendQuote({
          companyName: payload.contactBusinessName,
          submittedBy: `${payload.contactName} (${payload.contactEmail}`,
          email: payload.contactEmail,
          quoteId: quote.quoteId,
        });
      }
      if (isCreateQuoteVendor(payload)) {
        await this.sendQuote({
          companyName: payload.contactBusinessName,
          submittedBy: `${payload.vendorName} (${payload.vendorEmail}`,
          email: payload.vendorEmail,
          quoteId: quote.quoteId,
        });
      }
    }

    return quote;
  }

  getQuote(quoteId: string): Promise<Quote> {
    return this.createQuoteService.getQuote(quoteId);
  }

  sendQuote(payload: SendQuote): Promise<void> {
    return this.createQuoteService.sendQuote(payload);
  }
}
