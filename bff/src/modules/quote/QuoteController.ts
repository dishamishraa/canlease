import {
  CreateQuote, SendQuote, Quote, QuoteControllerContract, QuoteServiceContract,
} from './types';

export default class QuoteController implements QuoteControllerContract {
  private createQuoteService: QuoteServiceContract;

  constructor(createQuoteService: QuoteServiceContract) {
    this.createQuoteService = createQuoteService;
  }

  async createQuote(payload: CreateQuote): Promise<Quote> {
    return this.createQuoteService.createQuote(payload);
  }

  async getQuote(quoteId: number | string): Promise<Quote> {
    return this.createQuoteService.getQuote(quoteId);
  }

  async sendQuote(payload: SendQuote): Promise<void> {
    return this.createQuoteService.sendQuote(payload);
  }
}
