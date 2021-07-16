import {
  CreateQuote, isCreateQuoteCustomer, isCreateQuoteVendor, Quote,
} from '../../lib/salesforce/types';
import {
  QuoteControllerContract, QuoteServiceContract, SendQuote,
} from './types';

export default class QuoteController implements QuoteControllerContract {
  private createQuoteService: QuoteServiceContract;

  constructor(createQuoteService: QuoteServiceContract) {
    this.createQuoteService = createQuoteService;
  }

  async createQuote(payload: CreateQuote): Promise<Quote> {
    const quote = await this.createQuoteService.createQuote(payload);
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
    return quote;
  }

  getQuote(quoteId: string): Promise<Quote> {
    return this.createQuoteService.getQuote(quoteId);
  }

  sendQuote(payload: SendQuote): Promise<void> {
    return this.createQuoteService.sendQuote(payload);
  }
}
