import createError from 'http-errors';
import CommunicationApi from './CommunicationApi';
import mockSendQuote from './fixtures/mockSendQuote';

describe('CommunicationAPI', () => {
  const api = new CommunicationApi();
  //   const mockedSend = (send as jest.Mock);

  beforeEach(() => {
    // mockedSend.mockReset();
  });

  describe('sendQuote', () => {
    it('should send quote email', async () => {
    //   mockedSend.mockResolvedValue({});
    //   await api.sendQuote(mockSendQuote);
    //   expect(mockedSend).toHaveBeenCalledWith({
    //     templateData: {
    //       sendTo: 'test@testmail.com',
    //       action_url: '/instaQuote/abc',
    //       company_name: 'potato company',
    //       sign_up_link: '/account/signUp',
    //       submitted_by: 'some guy (guy@potato.ca)',
    //     },
    //   });
    });
  });

  it('should throw FailedToSendEmail on error', async () => {
    // mockedSend.mockRejectedValue({});
    // await expect(api.sendQuote(mockSendQuote))
    //   .rejects.toThrowError(createError.InternalServerError);
  });
});
