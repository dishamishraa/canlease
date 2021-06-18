import React, { useEffect, useState } from 'react';
import { AuthPageProps } from './AuthPage'
import { Redirect, useLocation, useHistory } from 'react-router-dom';

export type AuthPagePresenterProps = AuthPageProps & {

};

const withPresenter = (
    View: React.FC<AuthPageProps>,
  ): React.FC<AuthPagePresenterProps> => {
    const Presenter: React.FC<AuthPagePresenterProps> = (props) => {
        return <View
          {...props}
          />;
    };
  return Presenter;
};

export default withPresenter