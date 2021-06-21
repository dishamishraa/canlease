import { FRONTEND_URL } from '../../lib/config';
import {
  CreateQuote, SendQuote, Quote, QuoteControllerContract, QuoteServiceContract,
} from './types';

export default class QuoteController implements QuoteControllerContract {
  private createQuoteService: QuoteServiceContract;

  constructor(createQuoteService: QuoteServiceContract) {
    this.createQuoteService = createQuoteService;
  }

  async createQuote(payload: CreateQuote): Promise<Quote> {
    const quote = await this.createQuoteService.createQuote(payload);
    const { quoteId } = quote;
    const { userType, contactEmail } = payload;
    const actionUrl = `${FRONTEND_URL}/instaQuote/${quoteId}`;
    // TODO - uncomment when sendgrid endpoint implemented
    // await this.createQuoteService.sendQuote({ email: contactEmail, actionUrl });
    if (userType === 'vendor') {
      const { vendorEmail } = payload;
      // await this.createQuoteService.sendQuote({ email: vendorEmail, actionUrl });
    }
    return quote;
  }

  async getQuote(quoteId: number | string): Promise<Quote> {
    return this.createQuoteService.getQuote(quoteId);
  }

  async sendQuote(payload: SendQuote): Promise<void> {
    return this.createQuoteService.sendQuote(payload);
  }
}
