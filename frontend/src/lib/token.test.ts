import { mockAccount, mockToken, mockUser } from './fixtures/token';
import { extractJwtPayload, getUserFullName, getUserInitials } from './token';

describe('token', () => {
  describe('extractJwtPayload', () => {
    it('should extract the payload', () => {
      expect(extractJwtPayload(mockToken)).toMatchObject({
        user: mockUser
      });
    });
  });

  describe('getUserInitials', () => {

    it('should get user initials', () => {
      expect(getUserInitials(mockAccount)).toBe('NK');
    });

    it('should upper case user initials', () => {
      expect(getUserInitials({
        ...mockAccount,
        firstName: 'lowerFirstName',
        lastName: 'lowerLastName'
      })).toBe('LL');
    });

    it('should trim first and last names', () => {
      expect(getUserInitials({
        ...mockAccount,
        firstName: '   FirstName   ',
        lastName: '   LastName   '
      })).toBe('FL');
    });

    it('should handle empty first and last names', () => {
      expect(getUserInitials({
        ...mockAccount,
        firstName: '',
        lastName: undefined as any
      })).toBe('');
    });
  });

  describe('getUserFullName', () => {

    it('should get user full name', () => {
      expect(getUserFullName(mockAccount)).toBe('Nik k');
    });

    it('should trim first and last names', () => {
      expect(getUserFullName({
        ...mockAccount,
        firstName: '   FirstName   ',
        lastName: '   LastName   '
      })).toBe('FirstName LastName');
    });

    it('should handle empty first and last names', () => {
      expect(getUserFullName({
        ...mockAccount,
        firstName: '',
        lastName: undefined as any
      })).toBe('');
    });
  });
});
