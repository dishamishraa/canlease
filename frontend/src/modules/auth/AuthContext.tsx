/* eslint-disable max-classes-per-file,class-methods-use-this */

import React, { createContext, useState } from 'react';
import Cookie from 'js-cookie';
import { DOMAIN, SESSION_COOKIE_NAME } from '../../lib/config';
import { Account } from '../../lib/types';
import { extractJwtPayload } from '../../lib/token';
import { Profile } from '../profile/types';
import { useProfile } from '../profile';
import { State } from '../../lib/api/types';
import { useEffect } from 'react';

export type AuthContextValue = {
  account: Account | null;
  setAccount: (account: Account | null) => void;
  loading: boolean;
  error: Error | undefined;
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  refetchProfile: () => void;
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
  account: null,
  setAccount: () => {},
  loading: false,
  error: undefined,
  profile: null,
  setProfile: () => {},
  refetchProfile: () => {},
};

export const AuthContext = createContext<AuthContextValue>(initialAuthContext);

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const cookie = Cookie.get(SESSION_COOKIE_NAME);
  const [account, updateAccount] = 
    useState<Account | null>(cookie ? extractJwtPayload(cookie) : null);

  const {
    loading, data, refetch: refetchProfile,
  } = useProfile();
  const [profileState, updateProfile] = useState<State<Profile>>({
    loading,
    error: undefined,
    data,
  });

  useEffect(() => {
    updateProfile({
      loading,
      error: undefined,
      data,
    });
  }, [loading, data]);

  const setAccount = (account: Account | null) => {
    updateAccount(account);
  }

  const setProfile = (profile: Profile | null) => {
    updateProfile({
      loading: false,
      error: undefined,
      data: profile,
    });
  }
  return (
    <AuthContext.Provider value={{
      account, 
      setAccount,
      loading: profileState.loading, 
      error: profileState.error, 
      profile: profileState.data, 
      setProfile, 
      refetchProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
