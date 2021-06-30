import React, { useContext } from 'react';
import { ContactInformationBlockProps } from './ContactInformationBlock';
import { ContactInformationBlockPresenterProps } from './ContactInformationBlock.presenter';

const withInteractor = (
  Presenter: React.FC<ContactInformationBlockPresenterProps>,
): React.FC <ContactInformationBlockProps> => {
  const Interactor: React.FC <ContactInformationBlockProps> = (props) => {
    return (
      <Presenter
        {...props}
      />
    );
  };
  return Interactor;
};
export default withInteractor;
