import { FRONTEND_URL } from '../../lib/config';
import { CreateQuote, Quote } from '../../lib/salesforce/types';
import {
  QuoteControllerContract, QuoteServiceContract, SendQuote,
} from './types';

export default class QuoteController implements QuoteControllerContract {
  private createQuoteService: QuoteServiceContract;

  constructor(createQuoteService: QuoteServiceContract) {
    this.createQuoteService = createQuoteService;
  }

  createQuote(payload: CreateQuote): Promise<Quote> {
    return this.createQuoteService.createQuote(payload);
  }

  getQuote(quoteId: string): Promise<Quote> {
    return this.createQuoteService.getQuote(quoteId);
  }

  sendQuote(payload: SendQuote): Promise<void> {
    return this.createQuoteService.sendQuote(payload);
  }
}
