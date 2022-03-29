import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { CustomerBusinessInformationBlockProps } from './CustomerBusinessInformationBlock';
import { CustomerBusinessInformationBlockPresenterProps } from './CustomerBusinessInformationBlock.presenter';

const withInteractor = (
  Presenter: React.FC<CustomerBusinessInformationBlockPresenterProps>,
): React.FC<CustomerBusinessInformationBlockProps> => {
  const Interactor: React.FC<CustomerBusinessInformationBlockProps> = (props) => {
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
