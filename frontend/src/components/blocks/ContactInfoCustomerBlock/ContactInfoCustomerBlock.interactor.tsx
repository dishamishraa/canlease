import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { ContactInfoCustomerBlockProps } from './ContactInfoCustomerBlock';
import { ContactInfoCustomerBlockPresenterProps } from './ContactInfoCustomerBlock.presenter';

const withInteractor = (
  Presenter: React.FC<ContactInfoCustomerBlockPresenterProps>,
): React.FC<ContactInfoCustomerBlockProps> => {
  const Interactor: React.FC<ContactInfoCustomerBlockProps> = (props) => {
    const { user, account, refetchUser } = useContext(AuthContext);
    
    return (
      <Presenter 
        {...props}
      />
    );
  };

  return Interactor;
};

export default withInteractor;
