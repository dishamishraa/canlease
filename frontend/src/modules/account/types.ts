import { Account } from '../../lib/types';

export type AccountResponse = Account & {
  token: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
  enabled: boolean;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type UpdatePasswordPayload = {
  id: number;
  password: string;
};

export type UpdateNamePayload = {
  id: string;
  firstName: string;
  lastName: string;
};