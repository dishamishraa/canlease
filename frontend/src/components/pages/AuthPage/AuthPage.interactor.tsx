import React, { useContext } from 'react';
import { AuthPageProps } from './AuthPage';
import { AuthPagePresenterProps } from './AuthPage.presenter';

const withInteractor = (
  Presenter: React.FC<AuthPagePresenterProps>,
): React.FC <AuthPageProps> => {
  
  const Interactor: React.FC <AuthPageProps> = (props) => {
    return (
      <Presenter
        {...props}
      />
    );
  }
  return Interactor;
};
export default withInteractor;
