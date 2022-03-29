import React from 'react';
import { CustomerPersonalInformationBlockProps } from './CustomerPersonalInformationBlock';
import { CustomerPersonalInformationBlockPresenterProps } from './CustomerPersonalInformationBlock.presenter';

const withInteractor = (
  Presenter: React.FC<CustomerPersonalInformationBlockPresenterProps>,
): React.FC <CustomerPersonalInformationBlockProps> => {
  const Interactor: React.FC <CustomerPersonalInformationBlockProps> = (props) => (
      <Presenter
        {...props}
      />
  );
  return Interactor;
};
export default withInteractor;
