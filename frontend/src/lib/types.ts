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

export type ServiceErrorResponse = {
  code: number;
  type: string;
  message: string;
};

