export type User = {
  id: number;
  uuid: string;
  accountId: number;
};

export type Account = {
  id: number;
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
};

/**
 * Extracts payload from a jwt
 */
export function extractJwtPayload(jwt: string): Account {
  const payload = window.atob(jwt.split('.')[1]);
  return JSON.parse(payload);
}

export function getUserInitials(account: Account): string {
  const { firstName = '', lastName = '' } = account;
  const firstInitial: string = firstName.trim()[0] ?? '';
  const secondInitial: string = lastName.trim()[0] ?? '';
  return `${firstInitial}${secondInitial}`.toLocaleUpperCase();
}

export function getUserFullName(account: Account): string {
  const { firstName = '', lastName = '' } = account;
  return `${firstName.trim()} ${lastName.trim()}`.trim();
}
