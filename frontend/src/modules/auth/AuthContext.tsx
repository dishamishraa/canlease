/* eslint-disable max-classes-per-file,class-methods-use-this */

import React, { createContext, useState } from 'react';
import Cookie from 'js-cookie';
import { DOMAIN, SESSION_COOKIE_NAME } from '../../lib/config';
import { Account } from '../../lib/types';
import { extractJwtPayload } from '../../lib/token';
import { Profile } from '../profile/types';
import { useProfile } from '../profile';
import { State } from '../../lib/api/types';

export type AuthContextValue = {
  account: Account | null;
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
  loading: false,
  error: undefined,
  profile: null,
  setProfile: () => {},
  refetchProfile: () => {},
};

export const AuthContext = createContext<AuthContextValue>(initialAuthContext);

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const cookie = Cookie.get(SESSION_COOKIE_NAME);
  const account = cookie ? extractJwtPayload(cookie) : null;
  const {
    loading, error, data, refetch: refetchProfile,
  } = useProfile();
  const [profileState, updateProfile] = useState<State<Profile>>({
    loading,
    error,
    data,
  });

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
