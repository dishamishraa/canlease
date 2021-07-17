import { 
  CreateQuote, isCreateQuoteCustomer, isCreateQuoteVendor, Quote, QuoteOption,
} from '../../lib/salesforce/types';
import {
  QuoteControllerContract, QuoteServiceContract, SendQuote,
} from './types';
import calculator from '../calculator';
import { RateCardServiceContract } from '../rateCard';
import { Rate } from '../rateCard/types';
import { NotFoundError } from '../../lib/errors';

export default class QuoteController implements QuoteControllerContract {
  private createQuoteService: QuoteServiceContract;

  private rateCardService: RateCardServiceContract;

  constructor(createQuoteService: QuoteServiceContract, rateCardService: RateCardServiceContract) {
    this.createQuoteService = createQuoteService;
    this.rateCardService = rateCardService;
  }

  async getRates(cardType: string, applicationAmount: number): Promise<Rate[]> {
    const rateCards = await this.rateCardService.getRateCards();
    const rateCard = rateCards.find((card) => card.cardtype.toLowerCase() === cardType);
    if (!rateCard) {
      throw NotFoundError('no matching rate card');
    }
    const rateCardRates = await this.rateCardService.getRates(rateCard.id);
    return rateCardRates.filter(({ minmonthlyreturn, maxmonthlyreturn }) => {
      return applicationAmount >= minmonthlyreturn && applicationAmount < maxmonthlyreturn;
    }).sort((rate1, rate2) => {
      return rate1.term - rate2.term;
    });
  }

  getCardType(payload: CreateQuote): string {
    // It uses the v card for vendors
    // the specified card for Canlease Reps
    // e card for everyone else

    if(payload.rateCardType) {
      return payload.rateCardType;
    }
    if(isCreateQuoteVendor(payload)) {
      return 'v card';
    }
    return 'e card';
  }

  async createQuote(payload: CreateQuote): Promise<Quote> {
    const { applicationAmount, leaseType } = payload;

    const fee = 0;
    const terms: number[] = [24, 36, 48, 60];
    const interestRates: Record<number, number> = {};

    const rates = await this.getRates(this.getCardType(payload), applicationAmount);
    rates.forEach(({term, regularir, tenatendir}) => {
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
      .map(({ amount, costOfFinanceRate, term }): QuoteOption => {
        return {
          monthlyAmount: amount,
          financeRate: parseFloat((costOfFinanceRate * 100).toFixed(4)),
          term: `${term}M`,
          purchaseOptionDate: '',
        }
      });
    const quote = await this.createQuoteService.createQuote({
      ...payload,
      quoteOptions,
    });

    if(isCreateQuoteCustomer(payload)) {
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
    return quote;
  }

  getQuote(quoteId: string): Promise<Quote> {
    return this.createQuoteService.getQuote(quoteId);
  }

  sendQuote(payload: SendQuote): Promise<void> {
    return this.createQuoteService.sendQuote(payload);
  }
}
