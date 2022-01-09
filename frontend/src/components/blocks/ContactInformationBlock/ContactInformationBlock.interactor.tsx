import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { ContactInformationBlockProps } from './ContactInformationBlock';
import { ContactInformationBlockPresenterProps } from './ContactInformationBlock.presenter';

const withInteractor = (
  Presenter: React.FC<ContactInformationBlockPresenterProps>,
): React.FC <ContactInformationBlockProps> => {
  const Interactor: React.FC <ContactInformationBlockProps> = (props) => {
    const { account } = useContext(AuthContext);
    return (
      <Presenter
        {...props}
        email={account?.email}
      />
    );
  };
  return Interactor;
};
export default withInteractor;
