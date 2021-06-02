import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { DOMAIN, SESSION_COOKIE_NAME } from '../../lib/config';
import { logout } from './api';

type UseLogoutResult = () => void;

const useLogout = (): UseLogoutResult => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleLogout = useCallback(
    () => {
      removeCookie(SESSION_COOKIE_NAME, { path: '/', domain: DOMAIN });
      logout();
    },
    [removeCookie],
  );

  return handleLogout;
};

export default useLogout;
