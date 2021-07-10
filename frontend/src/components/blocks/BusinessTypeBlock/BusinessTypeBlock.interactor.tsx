import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { BusinessTypeBlockProps } from './BusinessTypeBlock';
import { BusinessTypeBlockPresenterProps } from './BusinessTypeBlock.presenter';

const withInteractor = (
  Presenter: React.FC<BusinessTypeBlockPresenterProps>,
): React.FC<BusinessTypeBlockProps> => {
  const Interactor: React.FC<BusinessTypeBlockProps> = (props) => {
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
