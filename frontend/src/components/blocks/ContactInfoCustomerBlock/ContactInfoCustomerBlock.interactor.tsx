import React from 'react';
import { ContactInfoCustomerBlockProps } from './ContactInfoCustomerBlock';
import { ContactInfoCustomerBlockPresenterProps } from './ContactInfoCustomerBlock.presenter';

const withInteractor = (
  Presenter: React.FC<ContactInfoCustomerBlockPresenterProps>,
): React.FC<ContactInfoCustomerBlockProps> => {
  const Interactor: React.FC<ContactInfoCustomerBlockProps> = (props) => (
      <Presenter
        {...props}
      />
  );

  return Interactor;
};

export default withInteractor;
