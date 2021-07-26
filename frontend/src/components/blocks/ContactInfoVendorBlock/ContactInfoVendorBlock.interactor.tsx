import React from 'react';
import { ContactInfoVendorBlockProps } from './ContactInfoVendorBlock';
import { ContactInfoVendorBlockPresenterProps } from './ContactInfoVendorBlock.presenter';

const withInteractor = (
  Presenter: React.FC<ContactInfoVendorBlockPresenterProps>,
): React.FC<ContactInfoVendorBlockProps> => {
  const Interactor: React.FC<ContactInfoVendorBlockProps> = (props) => (
      <Presenter
        {...props}
      />
  );

  return Interactor;
};

export default withInteractor;
