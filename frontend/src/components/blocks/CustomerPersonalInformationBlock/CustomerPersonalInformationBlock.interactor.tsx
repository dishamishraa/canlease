import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { CustomerPersonalInformationBlockProps } from './CustomerPersonalInformationBlock';
import { CustomerPersonalInformationBlockPresenterProps } from './CustomerPersonalInformationBlock.presenter';

const withInteractor = (
  Presenter: React.FC<CustomerPersonalInformationBlockPresenterProps>,
): React.FC <CustomerPersonalInformationBlockProps> => {
  const Interactor: React.FC <CustomerPersonalInformationBlockProps> = (props) => {
    return (
      <Presenter
        {...props}
      />
  );
  }
  return Interactor;
};
export default withInteractor;
