import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { ContactInfoVendorBlockProps } from './ContactInfoVendorBlock';
import { ContactInfoVendorBlockPresenterProps } from './ContactInfoVendorBlock.presenter';

const withInteractor = (
  Presenter: React.FC<ContactInfoVendorBlockPresenterProps>,
): React.FC<ContactInfoVendorBlockProps> => {
  const Interactor: React.FC<ContactInfoVendorBlockProps> = (props) => {    
    return (
      <Presenter 
        {...props}
      />
    );
  };

  return Interactor;
};

export default withInteractor;
