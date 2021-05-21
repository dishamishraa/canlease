import React from 'react';

import { LocaleProvider } from './modules/locale';
import { AuthProvider } from './modules/auth';

const AppProvider: React.FC<{}> = ({ children }) => (
  <LocaleProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </LocaleProvider>
);

export default AppProvider;
