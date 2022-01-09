import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth/AuthContext';
import { UserProfileProps } from './UserProfile';
import { UserProfilePresenterProps } from './UserProfile.presenter';

const withInteractor = (
  Presenter: React.FC<UserProfilePresenterProps>,
): React.FC<UserProfileProps> => {
  const Interactor: React.FC<UserProfileProps> = (props) => {
    const { account } = useContext(AuthContext);
    return <Presenter {...props} account={account} />;
  };

  return Interactor;
};

export default withInteractor;
