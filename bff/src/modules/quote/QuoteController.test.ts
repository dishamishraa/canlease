import mockSendQuote from './fixtures/mockSendQuote';
import QuoteController from './QuoteController';

describe('QuoteController', () => {
  const createQuoteService = {
    createQuote: jest.fn(),
    getQuote: jest.fn(),
    sendQuote: jest.fn(),
  };

  const rateCardService = {
    createRateCard: jest.fn(),
    getRateCard: jest.fn(),
    getRateCards: jest.fn(),
    updateRateCard: jest.fn(),
    deleteRateCard: jest.fn(),

    createRate: jest.fn(),
    getRates: jest.fn(),
    updateRate: jest.fn(),
    deleteRate: jest.fn(),
  };

  const controller = new QuoteController(createQuoteService, rateCardService);

  // describe('createQuote', () => {
  //   it('should call service with payload to create quote', async () => {
  // rateCardService.getRateCards.mockReturnValue([
  //   { cardtype: 'e card' },
  //   { cardtype: 'v card' }
  // ]);
  //     rateCardService.getRates.mockReturnValue([{
  //       term: 12,
  //       minmonthlyreturn: 0,
  //       maxmonthlyreturn: 999999,
  //       regularir: 12,
  //       tenatendir: 12,
  //     }]);
  //     createQuoteService.createQuote.mockReturnValue(mockQuote);
  //     await controller.createQuote(mockCreateQuote);

  //     expect(createQuoteService.createQuote).toHaveBeenCalledWith(mockCreateQuote);
  //   });
  // });

  describe('getQuote', () => {
    it('should call service with id', async () => {
      await controller.getQuote('abc');
      expect(createQuoteService.getQuote).toHaveBeenCalledWith('abc');
    });
  });

  describe('sendQuote', () => {
    it('should call service with payload to send quote', async () => {
      await controller.sendQuote(mockSendQuote);
      expect(createQuoteService.sendQuote).toHaveBeenCalledWith(mockSendQuote);
    });
  });
});
