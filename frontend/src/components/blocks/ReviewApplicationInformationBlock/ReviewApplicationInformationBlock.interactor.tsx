import React, { useContext } from 'react';
import { ReviewApplicationInformationBlockProps } from './ReviewApplicationInformationBlock';
import { ReviewApplicationInformationBlockPresenterProps } from './ReviewApplicationInformationBlock.presenter';

import { AuthContext } from '../../../modules/auth';

const withInteractor = (
  Presenter: React.FC<ReviewApplicationInformationBlockPresenterProps>,
): React.FC<ReviewApplicationInformationBlockProps> => {
  const Interactor: React.FC<ReviewApplicationInformationBlockProps> = (props) => {
    const { profile } = useContext(AuthContext);
    return (
      <Presenter
        {...props}
        profile={profile}
      />
    );
  };

  return Interactor;
};

export default withInteractor;
