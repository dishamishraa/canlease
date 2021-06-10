import { CreateQuote, SendQuote, QuoteControllerContract, QuoteServiceContract } from './types';

export default class QuoteController implements QuoteControllerContract {
  private createQuoteService: QuoteServiceContract;

  constructor(createQuoteService: QuoteServiceContract) {
    this.createQuoteService = createQuoteService;
  }

  async createQuote(payload: CreateQuote): Promise<void> {
    return this.createQuoteService.createQuote(payload);
  }

  async sendQuote(payload: SendQuote): Promise<void> {
    return this.createQuoteService.sendQuote(payload);
  }
}
