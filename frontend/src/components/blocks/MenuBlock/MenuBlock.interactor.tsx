import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { MenuBlockProps } from './MenuBlock';
import { MenuBlockPresenterProps } from './MenuBlock.presenter';

const withInteractor = (
  Presenter: React.FC<MenuBlockPresenterProps>,
): React.FC<MenuBlockProps> => {
  const Interactor: React.FC<MenuBlockProps> = (props) => {
    const { profile } = useContext(AuthContext);
    return (
      <Presenter
        {...props}
        profile={profile}
      />
    );
  };

  return Interactor;
};

export default withInteractor;
