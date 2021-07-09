import React, { useContext } from 'react';
import { PersonalInformationBlockProps } from './PersonalInformationBlock';
import { PersonalInformationBlockPresenterProps } from './PersonalInformationBlock.presenter';

const withInteractor = (
  Presenter: React.FC<PersonalInformationBlockPresenterProps>,
): React.FC <PersonalInformationBlockProps> => {
  const Interactor: React.FC <PersonalInformationBlockProps> = (props) => (
      <Presenter
        {...props}
      />
  );
  return Interactor;
};
export default withInteractor;
