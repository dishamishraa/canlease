import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { ProfileBlockProps } from './ProfileBlock';
import { ProfileBlockPresenterProps } from './ProfileBlock.presenter';

const withInteractor = (
  Presenter: React.FC<ProfileBlockPresenterProps>,
): React.FC<ProfileBlockProps> => {
  const Interactor: React.FC<ProfileBlockProps> = (props) => (
      <Presenter
        {...props}
      />
  );

  return Interactor;
};

export default withInteractor;
