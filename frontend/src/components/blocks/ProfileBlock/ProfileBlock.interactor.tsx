import React, { useContext } from 'react';
import { ProfileBlockProps } from './ProfileBlock';
import { ProfileBlockPresenterProps } from './ProfileBlock.presenter';
import { AuthContext } from '../../../modules/auth';

const withInteractor = (
  Presenter: React.FC<ProfileBlockPresenterProps>,
): React.FC<ProfileBlockProps> => {
  const Interactor: React.FC<ProfileBlockProps> = (props) => {
    const { profile } = useContext(AuthContext);

    return <Presenter
            {...props}
            profile={profile}
        />;
  };

  return Interactor;
};

export default withInteractor;
