import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../../modules/auth';
import { TopBlockProps } from './TopBlock';
import { TopBlockPresenterProps } from './TopBlock.presenter';

const withInteractor = (
  Presenter: React.FC<TopBlockPresenterProps>,
): React.FC <TopBlockProps> => {
  const Interactor: React.FC <TopBlockProps> = (props) => {
    const { profile } = useContext(AuthContext);
    return <Presenter
    {...props}
    profile={profile}
    />;
  };
  return Interactor;
};
export default withInteractor;
