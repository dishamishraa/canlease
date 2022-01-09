import React, { useContext } from 'react';
import useCreateApplication from '../../../modules/application';
import { ApplicationPageProps } from './ApplicationPage';
import { ApplicationPagePresenterProps } from './ApplicationPage.presenter';

import { AuthContext } from '../../../modules/auth';

const withInteractor = (
  Presenter: React.FC<ApplicationPagePresenterProps>,
): React.FC <ApplicationPageProps> => {
  const Interactor: React.FC <ApplicationPageProps> = (props) => {
    const { profile } = useContext(AuthContext);
    const [, createApplication] = useCreateApplication();
    return (
      <Presenter
        {...props}
        createApplication={createApplication}
        profile={profile}
      />
    );
  };
  return Interactor;
};

export default withInteractor;
