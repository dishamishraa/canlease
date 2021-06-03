/* eslint-disable max-classes-per-file,class-methods-use-this */

import React, { createContext } from 'react';
import Cookie from 'js-cookie';
import { DOMAIN, SESSION_COOKIE_NAME } from '../../lib/config';
import { User, Account } from '../../lib/types';
import { extractJwtPayload } from '../../lib/token';
import useUser from './useUser';

export type AuthContextValue = {
  user: User | null;
  account: Account | null;
  loading: boolean;
  error: Error | undefined;
  refetchUser: (() => void) | null;
};

type NonNull<T> = {
  [P in keyof T]: Exclude<T[P], null>;
};

export type AuthenticatedContextValue = Readonly<NonNull<AuthContextValue>>;

export const logout = (): void => {
  Cookie.remove(SESSION_COOKIE_NAME, {
    domain: DOMAIN,
    secure: true,
  });
};

const initialAuthContext: AuthContextValue = {
  user: null,
  account: null,
  loading: false,
  error: undefined,
  refetchUser: null,
};

export const AuthContext = createContext<AuthContextValue>(initialAuthContext);

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const {
    data: user,
    loading,
    error,
    refetch: refetchUser,
  } = useUser();

  const cookie = Cookie.get(SESSION_COOKIE_NAME);
  const account = cookie ? extractJwtPayload(cookie) : null;

  return (
    <AuthContext.Provider value={{
      user, account, loading, error, refetchUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
