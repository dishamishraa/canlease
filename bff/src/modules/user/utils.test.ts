import { mocked } from 'ts-jest/utils';
import decode from 'jwt-decode';
import { decodeIdentityToken } from './utils';
import { mockIdentityTokenPayload } from './fixtures';

jest.mock('jwt-decode');
const mockedDecode = mocked(decode, true);

describe('user utils', () => {
  describe('decodeIdentityToken', () => {
    it('should return payload if decode succeeds', () => {
      mockedDecode.mockReturnValueOnce(mockIdentityTokenPayload);
      const token = 'token';

      const result = decodeIdentityToken(token);

      expect(mockedDecode).toHaveBeenCalledWith(token);
      expect(result).toEqual(mockIdentityTokenPayload);
    });

    it('should return null if decode fails', () => {
      mockedDecode.mockImplementationOnce(() => {
        throw new Error('Test');
      });
      const token = 'token';

      const result = decodeIdentityToken(token);

      expect(mockedDecode).toHaveBeenCalledWith(token);
      expect(result).toEqual(null);
    });
  });
});
