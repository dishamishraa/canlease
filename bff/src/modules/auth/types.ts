export type SignUpPayload = {
  email: string;
  password: string;
  enabled: boolean;
  firstName?: string;
  lastName?: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type Account = {
  id: number;
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  profile?: object;
  createdAt?: Date;
  status?: string;
};

export type AccountResponse = Account & {
  token: string;
};
