import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { ContentPageProps } from './ContentPage';
import { ContentPagePresenterProps } from './ContentPage.presenter';

const withInteractor = (
  Presenter: React.FC<ContentPagePresenterProps>,
): React.FC <ContentPageProps> => {
  const Interactor: React.FC <ContentPageProps> = (props) => {
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
