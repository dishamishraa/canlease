import { CreateQuote, CreateQuoteControllerContract, CreateQuoteServiceContract } from './types';

export default class QuoteController implements CreateQuoteControllerContract {
  private createQuoteService: CreateQuoteServiceContract;

  constructor(createQuoteService: CreateQuoteServiceContract) {
    this.createQuoteService = createQuoteService;
  }

  async createQuote(payload: CreateQuote): Promise<void> {
    return this.createQuoteService.createQuote(payload);
  }
}
